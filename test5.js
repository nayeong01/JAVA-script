/* 랜덤 수 연습하기 2 */

let prize = Math.random();
prize = prize * 10 + 1;
let prz = Math.floor(prize);

let num = prompt();
num = Number(num);
result = [];

let message = `My Selection is ${num}`;

switch(prz){
    case 1:
        result.push(1000);
        break;
    case 2:
        result.push(2000);
        break;
    case 3:
        result.push(3000);
        break;
    case 4:
        result.push(4000);
        break;
    case 5:
        result.push(5000);
        break;
    case 6:
        result.push(6000);
        break;
    case 7:
        result.push(7000);
        break;
    case 8:
        result.push(8000);
        break;
    case 9:
        result.push(9000);
        break;
    case 10:
        result.push(10000);
        break;
}
console.log(`${message} and prize is ${result}`);
