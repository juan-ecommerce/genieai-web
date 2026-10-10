export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span className={"brand-symbol " + className} aria-hidden="true">
      <img src="/brand/genie-lamp-64.png" alt="" width="64" height="64" />
    </span>
  );
}
export default function Brand() {
  return (
    <span className="brand">
      <img src="/brand/logo.png" alt="GenieAI" width="334" height="62" />
    </span>
  );
}
