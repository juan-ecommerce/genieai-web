import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getMetadata,
  metadata,
  normalizePath,
} from "../../shared/metadata.mjs";
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = normalizePath(pathname);
    const meta = getMetadata(path);
    document.title = meta.title;
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const site = canonical
      ? new URL(canonical.href).origin
      : window.location.origin;
    const url = new URL(site + path).href;
    if (canonical) canonical.href = url;
    for (const [selector, value] of [
      ['meta[name="description"]', meta.description],
      [
        'meta[name="robots"]',
        metadata[path] ? "index, follow" : "noindex, follow",
      ],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[property="og:url"]', url],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
    ])
      document.querySelector(selector)?.setAttribute("content", value);
  }, [pathname]);
  return null;
}
