/* 숫자 추측 게임 */

let num = prompt("1-5까지 중 아무 숫자를 입력하세요!");
num = Number(num);

let ranNum = Math.random();
ranNum = ranNum*5 +1;
let RanNum = Math.floor(ranNum);

if (num == RanNum){
    console.log(`입력한 숫자 : ${num}, 나온 숫자 : ${RanNum} \n숫자를 맞히셨습니다!`);
} else if(num < RanNum){
    console.log(`입력한 숫자 : ${num}, 나온 숫자 : ${RanNum} \n입력하신 숫자가 더 작습니다!`);
} else if(num > RanNum){
    console.log(`입력한 숫자 : ${num}, 나온 숫자 : ${RanNum} \n입력하신 숫자가 더 큽니다!`);
}
