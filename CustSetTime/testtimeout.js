import { busyTimeout, intervalTimeout } from "./Custom.js"

console.log("Start busy timeout")
busyTimeout(() => {
  console.log("Busy timeout finished after 2 seconds")
}, 2000)

console.log("Start interval timeout")
intervalTimeout(() => {
  console.log("Interval timeout finished after 2 seconds")
}, 2000)
