// 랜덤 숫자 맞히기 게임

let bool = true;

let num = Math.random();
num1 = num * 5+1;
let Num = Math.floor(num1);

while (bool) {
    let usernum = prompt('1에서 5까지 숫자 중 하나를 입력하세요!');
    userNum = Number(usernum);

    if (Num == userNum) {
        console.log(`${Num} = ${userNum} 숫자를 맞히셨습니다!`);
        bool = false;
    } else if(Num > userNum) {
        console.log(`고르신 숫자는 랜덤숫자보다 더 작습니다!`);
    } else {
        console.log(`고르신 숫자는 랜덤숫자보다 더 큽니다!`);
    }
}