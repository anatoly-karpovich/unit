export default function fibonacci(n: number) {
  if (n <= 0) {
    return 'Input must be a positive integer';
  }

  if (n === 1 || n === 2) {
    return 1;
  }

  let prev = 1;
  let current = 1;
  for (let i = 3; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}
