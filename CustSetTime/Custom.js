export function busyTimeout(callback, delay) {
  const start = Date.now()

  while (Date.now() - start < delay) {}

  callback()
}

export function intervalTimeout(callback, delay) {
  const start = Date.now()

  const timer = setInterval(() => {
    if (Date.now() - start >= delay) {
      clearInterval(timer)
      callback()
    }
  }, 1)
}
