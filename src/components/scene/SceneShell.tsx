import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
const Scene = lazy(() => import("./IntelligenceScene"));
// A decorative module failure must never replace the accessible website.
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function SceneShell({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion(),
    [available, setAvailable] = useState(true);
  const unavailable = useCallback(() => setAvailable(false), []);
  return (
    <div className="scene-shell" aria-hidden="true">
      <div className="scene-fallback" data-testid="scene-fallback">
        <div className="fallback-core" />
        <div className="fallback-ring" />
        <div className="fallback-ring ring-second" />
      </div>
      {!reduced && !paused && available && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene onUnavailable={unavailable} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
