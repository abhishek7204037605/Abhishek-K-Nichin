export function greet(name) {
  return `Hello, ${name}!`;
}
export function farewell(name) {
  return `Goodbye, ${name}! thanku for visiting.`;
}
export function Employee(id, name, position, salary) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.salary = salary;
}