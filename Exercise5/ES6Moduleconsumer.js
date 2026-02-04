import { greet,farewell,Employee } from './ES6Modules.js';
console.log(greet('Alice'));
console.log(farewell('Alice'));
const emp1 = new Employee(1, 'John Doe', 'Developer', 60000);
console.log(`Employee Details: ID=${emp1.id}, Name=${emp1.name}, Position=${emp1.position}, Salary=${emp1.salary}`);
//exercise is full scale employee module to produce and consume it