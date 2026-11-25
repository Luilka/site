import { act, renderHook } from "@testing-library/react";
import type { FocusEvent, KeyboardEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { useDismiss } from "@/shared/hooks/use-dismiss.ts";
import { useOpenMenu } from "@/shared/hooks/use-open-menu.ts";
import { useRetry } from "@/shared/hooks/use-retry.ts";

function blurEvent(inside: boolean): FocusEvent<HTMLElement> {
  const target = document.createElement("div");
  const related = document.createElement("span");
  if (inside) target.append(related);
  return { currentTarget: target, relatedTarget: related } as unknown as FocusEvent<HTMLElement>;
}

describe("shared hooks", () => {
  it("closes when focus leaves the popup", () => {
    const close = vi.fn();
    renderHook(() => useDismiss(close)).result.current.onBlur(blurEvent(false));
    expect(close).toHaveBeenCalledOnce();
  });

  it("stays open when focus moves inside the popup", () => {
    const close = vi.fn();
    renderHook(() => useDismiss(close)).result.current.onBlur(blurEvent(true));
    expect(close).not.toHaveBeenCalled();
  });

  it("closes on Escape only", () => {
    const close = vi.fn();
    const { onKeyDown } = renderHook(() => useDismiss(close)).result.current;
    onKeyDown({ key: "a" } as KeyboardEvent<HTMLElement>);
    onKeyDown({ key: "Escape" } as KeyboardEvent<HTMLElement>);
    expect(close).toHaveBeenCalledOnce();
  });

  it("opens one menu at a time and closes it", () => {
    const { result } = renderHook(() => useOpenMenu());
    act(() => result.current.open("services"));
    act(() => result.current.open("products"));
    expect(result.current.current).toBe("products");
    act(() => result.current.close());
    expect(result.current.current).toBeNull();
  });

  it("resets the failed subtree and counts the attempt", () => {
    const reset = vi.fn();
    const { result } = renderHook(() => useRetry());
    act(() => result.current.retry(reset));
    expect(reset).toHaveBeenCalledOnce();
    expect(result.current.attempt).toBe(1);
  });
});
