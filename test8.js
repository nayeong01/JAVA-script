let rps = ["rock","paper","scissors"];

let ranNum = Math.random()*3;
let RanNum = Math.floor(ranNum);
let ranResult = rps[RanNum];

let ranNum1 = Math.random()*3;
let RanNum1 = Math.floor(ranNum1);
let ranResult1 = rps[RanNum1];

//let user = prompt("rock(0), paper(1), scissors(2) 중 하나를 선택하세요!");
//let user1 = Number(user);
//let userResult = rps[user1];

let message = `<com>: ${ranResult}  <you>: ${ranResult1}`;
//**  방법 1 **
if(RanNum1 == RanNum){
    console.log(`${message} \n비겼습니다!`);
} else if(RanNum1 > RanNum){
    if(RanNum1 ==2 && RanNum ==0){
        console.log(`${message} \n당신이 졌습니다!`);
    }else{
        console.log(`${message} \n당신이 이겼습니다!`);
    }
} else if(RanNum1 < RanNum){
    if(RanNum1 == 0 && RanNum ==2){
        console.log(`${message} \n당신이 이겼습니다!`);
    } else{
    console.log(`${message} \n당신이 졌습니다!`);
    }
}
//**  방법 2 **
let result = RanNum1 - RanNum;
switch(result){
    case 0: 
        console.log(`${message} \n비겼습니다!`);
        break;
    case 1: 
    case -2: 
        console.log(`${message} \n당신이 이겼습니다!`);
        break;
    case 2: 
    case -1: 
        console.log(`${message} \n당신이 졌습니다!`);
        break;
}
