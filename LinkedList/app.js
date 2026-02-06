import { LinkedList } from "./LinkedList.js"

const list = new LinkedList()

list.insert(10)
list.insert(20)
list.insert(30)
list.insert(40)

console.log("Initial list:")
list.print()

console.log("Find 20:", list.find(20))
console.log("Find 99:", list.find(99))

list.delete(20)
console.log("After deleting 20:")
list.print()

list.reverse()
console.log("After reversing:")
list.print()
