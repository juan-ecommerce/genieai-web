import { useEffect, type RefObject } from "react";
export function useDialog(
  open: boolean,
  ref: RefObject<HTMLElement>,
  onClose: () => void,
  returnFocusFallback?: () => void,
) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const dialog = ref.current;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") && element.offsetParent !== null,
      );
    const frame = requestAnimationFrame(() =>
      (
        dialog.querySelector<HTMLElement>("[data-autofocus]") ||
        focusable()[0] ||
        dialog
      ).focus(),
    );
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0],
          last = elements.at(-1);
        if (!first) {
          event.preventDefault();
          dialog.focus();
          return;
        }
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !dialog.contains(document.activeElement))
        ) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !dialog.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = originalOverflow;
      if (previous?.isConnected) previous.focus();
      else returnFocusFallback?.();
    };
  }, [open, ref, onClose, returnFocusFallback]);
}
