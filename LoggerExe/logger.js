import fs from "fs"
import path from "path"

const LOG_FILE = "app.log"
const MAX_SIZE = 1024 * 1024

function rotateIfNeeded() {
  if (!fs.existsSync(LOG_FILE)) return

  const stats = fs.statSync(LOG_FILE)

  if (stats.size < MAX_SIZE) return

  const time = new Date().toISOString().replace(/[:.]/g, "-")
  const newName = `app-${time}.log`

  fs.renameSync(LOG_FILE, newName)
}

export function log(message) {
  rotateIfNeeded()

  const time = new Date().toISOString()
  const line = `[${time}] ${message}\n`

  fs.appendFileSync(LOG_FILE, line)
}
