import readline from "readline"
import { factorial, isPrime, matrixMultiply } from "./mathUtils.js"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function menu() {
  console.log("\n--- CLI Math Calculator ---")
  console.log("1. Factorial")
  console.log("2. Prime Check")
  console.log("3. Matrix Multiplication")
  console.log("4. Exit")

  rl.question("Choose option: ", handleChoice)
}

function handleChoice(choice) {
  if (choice === "1") {
    rl.question("Enter number: ", n => {
      console.log("Factorial =", factorial(Number(n)))
      menu()
    })
  } 
  else if (choice === "2") {
    rl.question("Enter number: ", n => {
      console.log("Is Prime =", isPrime(Number(n)))
      menu()
    })
  } 
  else if (choice === "3") {
    const a = [
      [1, 2],
      [3, 4]
    ]

    const b = [
      [5, 6],
      [7, 8]
    ]

    console.log("Matrix Result =", matrixMultiply(a, b))
    menu()
  } 
  else {
    rl.close()
  }
}

menu()
