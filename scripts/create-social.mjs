import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// A code-native version of the intelligence core for social previews.
const particles = Array.from({ length: 1800 }, (_, index) => {
  const y = 1 - (index / 1799) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return (
    '<circle cx="' +
    (930 + x * 208).toFixed(2) +
    '" cy="' +
    (320 + y * 208).toFixed(2) +
    '" r="' +
    (0.6 + (z + 1) * 0.3).toFixed(2) +
    '" fill="' +
    (z > 0.2 ? "#9db2ff" : "#4f82c9") +
    '" opacity="' +
    (0.2 + (z + 1) * 0.3).toFixed(2) +
    '"/>'
  );
}).join("");
const logo = (await readFile("public/brand/logo.png")).toString("base64");
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><radialGradient id="core"><stop stop-color="#1c2b59"/><stop offset=".7" stop-color="#0b1329"/><stop offset="1" stop-color="#080b11"/></radialGradient><radialGradient id="glow"><stop stop-color="#7190e1" stop-opacity=".16"/><stop offset="1" stop-color="#080b11" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#080b11"/><circle cx="930" cy="320" r="310" fill="url(#glow)"/><circle cx="930" cy="320" r="208" fill="url(#core)"/>' +
  particles +
  '<g transform="rotate(-30 930 320)" fill="none"><ellipse cx="930" cy="320" rx="300" ry="115" stroke="#809cea" stroke-width="1.5"/><ellipse cx="930" cy="320" rx="313" ry="128" stroke="#3e5389" stroke-width=".7"/></g><circle cx="1080" cy="113" r="6" fill="#cfdbff"/><g fill="#b8a5ff"><path d="M75 42 80 56 94 61 80 66 75 80 70 66 56 61 70 56Z"/></g><g font-family="Arial, sans-serif"><text x="108" y="72" fill="#eeeff2" font-size="30" font-weight="600" letter-spacing="-1.5">GenieAI</text><text x="64" y="174" fill="#a4adbf" font-size="11" letter-spacing="2.2">AI &amp; AUTOMATION STUDIO · STOCKHOLM</text><g font-size="76" font-weight="600" letter-spacing="-4"><text x="60" y="273" fill="#eeeff2">Intelligence.</text><text x="60" y="365" fill="#eeeff2">Built for</text><text x="60" y="457" fill="#b8a5ff">what’s next.</text></g><text x="64" y="526" fill="#939eaf" font-size="15">AI agents. Connected knowledge. Automation.</text><text x="64" y="591" fill="#67748e" font-size="10" letter-spacing="1.5">HUMAN IDEAS. INTELLIGENT SYSTEMS.</text></g></svg>';
const brandedSvg = svg
  .replace(
    /<g fill="#b8a5ff"><path[^>]*\/><\/g><g font-family="Arial, sans-serif"><text[^>]*>GenieAI<\/text>/,
    '<rect x="60" y="36" width="248" height="60" rx="8" fill="white"/><image x="72" y="46" width="224" height="41" href="data:image/png;base64,' +
      logo +
      '"/><g font-family="Arial, sans-serif">',
  )
  .replace(
    "AI agents. Connected knowledge. Automation.",
    "AI agents. Automation. Predictive data science.",
  );
await mkdir("public/brand", { recursive: true });
await writeFile("public/brand/social.svg", brandedSvg);
const lampSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="white"/><svg x="4" y="4" width="56" height="56" viewBox="0 0 61 62"><image width="334" height="62" href="data:image/png;base64,' +
  logo +
  '"/></svg></svg>';
await writeFile("public/brand/genie-lamp.svg", lampSvg);
await writeFile("public/brand/favicon.svg", lampSvg);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    '<html><body style="margin:0">' + brandedSvg + "</body></html>",
  );
  await page.screenshot({ path: "public/brand/social.png" });
  const frames = [];
  for (const size of [16, 32, 48, 64, 180]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      '<html><body style="margin:0;background:transparent"><div style="width:' +
        size +
        "px;height:" +
        size +
        'px">' +
        lampSvg.replace(
          'width="64" height="64"',
          'width="100%" height="100%"',
        ) +
        "</div></body></html>",
    );
    await page.waitForFunction(
      () => document.querySelector("svg image") !== null,
    );
    // SVG image decoding is asynchronous. Decode the embedded source before capture.
    await page.evaluate(async () => {
      const image = new Image();
      image.src = document.querySelector("svg image").getAttribute("href");
      await image.decode();
    });
    const png = await page.screenshot({ omitBackground: true });
    if (size === 64) await writeFile("public/brand/genie-lamp-64.png", png);
    if (size === 180) await writeFile("public/brand/apple-touch-icon.png", png);
    if (size <= 48) frames.push({ size, png });
  }
  // ICO directory with PNG frames preserves the original artwork at common tab sizes.
  const directory = Buffer.alloc(6 + frames.length * 16);
  directory.writeUInt16LE(1, 2);
  directory.writeUInt16LE(frames.length, 4);
  let offset = directory.length;
  for (const [index, frame] of frames.entries()) {
    const entry = 6 + index * 16;
    directory.writeUInt8(frame.size, entry);
    directory.writeUInt8(frame.size, entry + 1);
    directory.writeUInt16LE(1, entry + 4);
    directory.writeUInt16LE(32, entry + 6);
    directory.writeUInt32LE(frame.png.length, entry + 8);
    directory.writeUInt32LE(offset, entry + 12);
    offset += frame.png.length;
  }
  await writeFile(
    "public/brand/genie-lamp.ico",
    Buffer.concat([directory, ...frames.map((frame) => frame.png)]),
  );
} finally {
  await browser.close();
}
