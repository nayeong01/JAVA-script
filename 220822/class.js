class ClassName {
    constructor(prop1, prop2) {
      this.prop1 = prop1;
      this.prop2 = prop2;
    }
  }

let obj = new ClassName("arg1", "arg2");
console.log(obj);

function Dog(dogName, weight, color, breed) {  
  this.dogName = dogName; 
  this.weight = weight; 
  this.color = color; 
  this.breed = breed; 
}  
let dog = new Dog("Jacky", 30, "brown", "labrador");
console.log(dog);

class Dog1 {
  constructor(dogName, weight, color, breed) {
    this.dogName = dogName;
    this.weight = weight;    this.color = color;
    this.breed = breed
  }
}
let dog1 = new Dog1("JavaScript", 2.4, "brown", "chihuahua");
console.log(dog1.dogName, "is a", dog1.breed, "and weight is", dog1.weight, "kg.");

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
  greet() {
    console.log("Hi there!");
  }
  compliment(name, object) {
    return "That's a wonderful " + object + ", " + name;
  }

}
let p = new Person("Maaike", "van Putten");
console.log("Hi", p.firstname);

let compliment = p.compliment("Harry", "hat");
console.log(compliment);

