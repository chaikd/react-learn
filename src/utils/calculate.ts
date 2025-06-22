export function accurate(num: number) {
  if (!num) return 0
  let m = Math.pow(10, 10)
  return (num * m) / m
}