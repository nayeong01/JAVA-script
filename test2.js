// ** 입장 나이 if 문 ** //

let age = prompt();
let ageInt = Number(age);
let message =`당신은 ${ageInt}살입니다. `;

if (ageInt >21){
    console.log(message + "입장이 가능합니다.");
    console.log("알코올 구매가 가능합니다.");
} else if (age >= 19){
    console.log(message + "입장이 가능합니다.");
    console.log("알코올 구매가 불가능합니다.");
} else{
    console.log(message + "입장이 불가능합니다.");
}