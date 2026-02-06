import fs from "fs"
import path from "path"

const sourceDir = process.argv[2]
const destDir = process.argv[3]

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log("Source directory not found")
    return
  }

  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
  } catch {
    console.log("Cannot create destination directory")
    return
  }

  let items

  try {
    items = fs.readdirSync(src)
  } catch {
    console.log("Permission denied while reading source")
    return
  }

  items.forEach(item => {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)

    try {
      const stats = fs.statSync(srcPath)

      if (stats.isDirectory()) {
        copyRecursive(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
        console.log("Copied:", item)
      }
    } catch {
      console.log("Skipped due to permission:", item)
    }
  })
}

if (!sourceDir || !destDir) {
  console.log("Usage: node backup.js <source> <destination>")
} else {
  copyRecursive(sourceDir, destDir)
  console.log("Backup completed")
}
