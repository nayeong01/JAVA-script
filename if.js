let rain = true;
if(rain){
    console.log("** Taking my umbrella when I need to go outside **");
} else {
    consdle.log("** I can leave my umbrella at home **");
}
console.log("\n");

let age = 20;
if(age < 18) {
    console.log("We're very sorry, but you can't get in under 18");
  } else {
    console.log("Welcome!");
  }
  console.log("\n");


//if문에 관련해서 일어나는 흔한 실수 중 하나
let hobby = "dancing";
if(hobby = "coding") { // 비교는 반드시 == 이렇게 써야 된다. 여기선 hobby를 coding으로 바꿔버렸다.
  console.log("** I love coding too! **");
} else {
  console.log("** Can you teach me that? **");
}
console.log("\n");


let age1 = 70;
let cost = 0;
let message;
if (age1 < 3){
    cost = 0;
    message = "Access is free under three";
} else if(age1 >=3 && age1 < 12){
    cost = 5;
    message = "With the child discount, the fee is 5 dollars";
} else {
    cost = 7;
    message = "A ticket is 7 dollars";
}
console.log(message);
console.log("Your Total cost "+cost);

if(age1 < 3){
    console.log("Access is free under three.");
  } else if(age1 < 12) {
    console.log("With the child discount, the fee is 5 dollars");
  } else if(age1 < 65) {
    console.log("A regular ticket costs 10 dollars.");
  } else if(age1 >= 65) {
    console.log("A ticket is 7 dollars.");
  }