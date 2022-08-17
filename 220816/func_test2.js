let x = 5;
let y = 4;
let plus = "+";
let minus = "-";

function addTwoNumbers(a, b, string) {
    if (string ==="-") {
        return a-b;
    } else {
        return a+b;
    }
}
console.log(addTwoNumbers(x,y,plus));
console.log(addTwoNumbers(x,y,minus));
console.log(addTwoNumbers());