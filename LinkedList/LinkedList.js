class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export class LinkedList {
  constructor() {
    this.head = null
  }

  insert(value) {
    const node = new Node(value)

    if (!this.head) {
      this.head = node
      return
    }

    let current = this.head
    while (current.next) {
      current = current.next
    }

    current.next = node
  }

  delete(value) {
    if (!this.head) return

    if (this.head.value === value) {
      this.head = this.head.next
      return
    }

    let current = this.head

    while (current.next && current.next.value !== value) {
      current = current.next
    }

    if (current.next) {
      current.next = current.next.next
    }
  }

  find(value) {
    let current = this.head

    while (current) {
      if (current.value === value) return true
      current = current.next
    }

    return false
  }

  reverse() {
    let prev = null
    let current = this.head

    while (current) {
      const next = current.next
      current.next = prev
      prev = current
      current = next
    }

    this.head = prev
  }

  print() {
    let current = this.head
    const values = []

    while (current) {
      values.push(current.value)
      current = current.next
    }

    console.log(values.join(" -> "))
  }
}
