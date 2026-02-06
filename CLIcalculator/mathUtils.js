export function factorial(n) {
  if (n < 0) return null
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

export function isPrime(n) {
  if (n <= 1) return false
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false
  }
  return true
}

export function matrixMultiply(a, b) {
  const rows = a.length
  const cols = b[0].length
  const result = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < b.length; k++) {
        result[i][j] += a[i][k] * b[k][j]
      }
    }
  }

  return result
}
