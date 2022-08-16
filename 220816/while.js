// ** 원하는 이름 찾기 **
let someArray = ["Mike", "Antal", "Marc", "Emir", "Louiza", "Jacky"];
let notFound = true;
while (notFound && someArray.length > 0) {
  if (someArray[0] === "Louiza") {
    console.log("Found her!");
    notFound = false;
  } else {
    someArray.shift(); // 첫번째 요소 삭제하기
  }
}
console.log("\n");


// ** 피보나치수열 만들기 **
let nr1 = 0;
let nr2 = 1;
let temp;
fibonacciArray = [];
while (fibonacciArray.length < 25) {
  fibonacciArray.push(nr1); 
  temp = nr1 + nr2;  
  nr1 = nr2; //
  nr2 = temp; 
}
console.log(fibonacciArray);
console.log("\n");


// do-while문 //
let number;
do {
  number = prompt("Please enter a number between 0 and 100: ");
} while (!(number >= 0 && number < 100));
// 이 조건에 맞는 수가 들어오면, !(false)로 바꿔서 반복문을 끝낸다.