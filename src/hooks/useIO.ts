import { useEffect, useRef } from "react";

export function useIO(
  onChange: (entry: IntersectionObserverEntry) => void,
  opts?: IntersectionObserverInit
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => {
      for (const e of es) onChange(e);
    }, opts);
    obs.observe(el);
    return () => obs.disconnect();
  }, [onChange, opts]);

  return ref as React.MutableRefObject<any>;
}
