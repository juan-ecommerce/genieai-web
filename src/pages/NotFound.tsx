import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="section not-found">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>
        Not quite
        <br />
        <span className="text-muted">what’s next.</span>
      </h1>
      <p>
        That page couldn’t be found. Let’s get you back to the possibilities.
      </p>
      <Link className="button button-light" to="/">
        Back to the studio <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
