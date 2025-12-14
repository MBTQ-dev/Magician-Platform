export function getTrustScore(n: number) {
  // example small function to reuse your "fibonacci-like" logic
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let a = 0, b = 1;
  for (let i = 2; i <= Math.min(n, 50); i++) {
    const c = a + b;
    a = b;
    b = c;
  }

  return b;
}
