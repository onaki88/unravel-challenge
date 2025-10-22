import { useIO } from "./useIO";

export function useVisibility(
  onVisibleChange: (v: boolean) => void,
  rootMargin = "200px"
) {
  return useIO((e) => onVisibleChange(e.isIntersecting), { rootMargin });
}
