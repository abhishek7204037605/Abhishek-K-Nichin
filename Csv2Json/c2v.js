import fs from "fs"
import path from "path"

const inputFile = "data.csv"
const outputFile = "data.json"

function parseCSV(text) {
  const lines = text.trim().split("\n")
  const headers = lines[0].split(",").map(h => h.trim())

  const result = lines.slice(1).map(line => {
    const values = line.split(",")
    const obj = {}

    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim() : ""
    })

    return obj
  })

  return result
}

function convert() {
  if (!fs.existsSync(inputFile)) {
    console.log("CSV file not found")
    return
  }

  const csvText = fs.readFileSync(inputFile, "utf-8")
  const jsonData = parseCSV(csvText)

  fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2))

  console.log("Conversion completed →", outputFile)
}

convert()
