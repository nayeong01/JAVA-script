// 아규먼트 람다식으로 지정하기
let doingArrowStuff = x => console.log(x);
doingArrowStuff("Great!");

let addTwoNumbers = (x, y) => console.log(x + y);
addTwoNumbers(5, 3);

//아규먼트 없이 람다식 사용하기
let sayHi = () => console.log("hi");
sayHi();

// foreach로 배열 요소 나열하기
const arr = ["squirrel", "alpaca", "buddy"];
arr.forEach(e => console.log(e));


//...사용해서 spread 배열 message에 넣어버리기
let spread = ["so", "much", "fun"];
let message = ["JavaScript", "is", ...spread, "and", "very","powerful"];
console.log(message);
