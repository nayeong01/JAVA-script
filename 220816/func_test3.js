let x = 5;
let y = 4;

let plus = "+";
let minus = "-";

resultArr = [];

function addTwoNumbers(a, b, string) {
    if (string ==="-") {
        return a-b;
    } else {
        return a+b;
    }
}

for(let i=0; i<10; i++){
    let result = addTwoNumbers(i*5, i*i);
    resultArr.push(result);
}
console.log(resultArr);