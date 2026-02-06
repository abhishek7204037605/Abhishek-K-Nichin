import fs from "fs"
import path from "path"

const targetDir = process.argv[2] || "."

function currentFiles(dir) {
  return new Set(fs.readdirSync(dir))
}

let previous = currentFiles(targetDir)

console.log("Watching directory:", path.resolve(targetDir))

fs.watch(targetDir, { persistent: true }, () => {
  const now = currentFiles(targetDir)

  now.forEach(file => {
    if (!previous.has(file)) {
      console.log(`[${new Date().toLocaleTimeString()}] Added: ${file}`)
    }
  })

  previous.forEach(file => {
    if (!now.has(file)) {
      console.log(`[${new Date().toLocaleTimeString()}] Removed: ${file}`)
    }
  })

  now.forEach(file => {
    if (previous.has(file)) {
      console.log(`[${new Date().toLocaleTimeString()}] Modified: ${file}`)
    }
  })

  previous = now
})
