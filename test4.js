/* 랜덤 수 연습하기 */

let ranNum = Math.random();
ranNum = ranNum * 6;
RanNum = Math.floor(ranNum); // 소수점 이하 버리는 메서드

let qst = prompt();
let answer = [];

switch(RanNum){
    case 0:
        answer.push("미국");
        break;
    case 1:
        answer.push("영국");
        break;
    case 2:
        answer.push("뉴질랜드");
        break;
    case 3:
        answer.push("체코");
        break;
    case 4:
        answer.push("프랑스");
        break;
    case 5:
        answer.push("한국");
        break;
}

console.log(`${qst} : ${answer}`);