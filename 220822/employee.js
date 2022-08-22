class Employee{
    constructor(firstname, lastname, year){
        this.firstname = firstname;
        this.lastname = lastname;
        this.year = year;

    }
}
const employee = [];
Employee.prototype.info = function(){
    let emp = {};
    emp.firstname = this.firstname;
    emp.lastname = this.lastname;
    emp.year = this.year;
    employee.push(emp);
    return employee;
    //return employee;
}

let emp1 = new Employee("nayeong","kim", 3);
let emp2 = new Employee("hyun","kim", 5);
emp1.info();
emp2.info();
console.log(employee);
