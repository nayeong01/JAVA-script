class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }

    fullName() {
        return "Full name: "+ this.firstname + " "+ this.lastname;
    }
}   

let friend1 = new Person("hyun", "kim");
let friend2 = new Person("jin","koo");

console.log("Hello!", friend1.firstname, friend1.lastname);
console.log("Hello!", friend2.firstname, friend2.lastname);

let full1 = friend1.fullName();
let full2 = friend2.fullName();

console.log(full1);
console.log(full2);
