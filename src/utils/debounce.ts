export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  wait = 150
) {
  let t: any;
  return (...args: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
