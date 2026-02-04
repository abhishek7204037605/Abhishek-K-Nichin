const flipkart = require("./Ex02Modules");
console.log(flipkart);
flipkart.additem({ name: "laptop", price: 45000 });
flipkart.additem({ name: "mobile", price: 25000 });
flipkart.additem({ name: "tablet", price: 15000 });
console.log("Items in Cart:", flipkart.getallitems());
console.log("Total Bill Amount:", flipkart.generatebill());
