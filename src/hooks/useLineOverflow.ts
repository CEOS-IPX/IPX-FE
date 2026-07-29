"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useLineOverflow<TReserve extends HTMLElement = HTMLButtonElement>(
  itemCount: number
) {
  const measureRef = useRef<HTMLDivElement>(null);
  const reserveRef = useRef<TReserve>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const measure = useCallback(() => {
    const container = measureRef.current;
    if (!container) return;

    const reserveEl = reserveRef.current;
    let reserveWidth = 0;
    if (reserveEl) {
      const style = getComputedStyle(reserveEl);
      reserveWidth =
        reserveEl.offsetWidth +
        parseFloat(style.marginLeft || "0") +
        parseFloat(style.marginRight || "0");
    }
    container.style.right = reserveWidth > 0 ? `${reserveWidth}px` : "";

    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) {
      setVisibleCount(0);
      setIsOverflowing(false);
      return;
    }

    const firstTop = children[0].offsetTop;
    const breakIndex = children.findIndex((child) => child.offsetTop > firstTop);

    if (breakIndex === -1) {
      setVisibleCount(children.length);
      setIsOverflowing(false);
    } else {
      setVisibleCount(breakIndex);
      setIsOverflowing(true);
    }
  }, []);

  useLayoutEffect(() => {
    measure();

    const container = measureRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);

    const reserveEl = reserveRef.current;
    if (reserveEl) observer.observe(reserveEl);

    return () => observer.disconnect();
  }, [measure, itemCount]);

  return { measureRef, reserveRef, visibleCount, isOverflowing };
}
