//결과 반환하는 함수 만들어보기
function addNumbers(a, b) {
    return a + b;
}
let x = 10;
let y = 20;

console.log(addNumbers(x,y));
console.log(addNumbers(2,3));


// 배열이랑 함수 같이 사용해보기
let arr = ['cool','happy','awesome'];
let sayhi = function(){
    let name = prompt("이름을 입력하세요!");
    let rannum = Math.random()*3;
    let ranNum = Math.floor(rannum);
    console.log("Hello!", arr[ranNum], name);
}
sayhi();