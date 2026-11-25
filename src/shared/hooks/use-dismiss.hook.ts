import type { FocusEvent, KeyboardEvent } from "react";

/** Closes a popup when focus leaves it or when Escape is pressed. */
export function useDismiss(onClose: () => void) {
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) onClose();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") onClose();
  };
  return { onBlur, onKeyDown };
}
