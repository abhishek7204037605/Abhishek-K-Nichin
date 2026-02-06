import fs from "fs"
import path from "path"

function printTree(dir, prefix = "") {
  let items

  try {
    items = fs.readdirSync(dir)
  } catch {
    console.log(prefix + "Cannot access")
    return
  }

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item)
    const isLast = index === items.length - 1
    const connector = isLast ? "└── " : "├── "

    console.log(prefix + connector + item)

    let stats
    try {
      stats = fs.statSync(fullPath)
    } catch {
      return
    }

    if (stats.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ")
      printTree(fullPath, newPrefix)
    }
  })
}

const targetDir = process.argv[2] || "."

console.log("Directory Tree:\n")
printTree(targetDir)
