let activity = "Get up";

switch(activity) {
    case "Get up": 
         console.log("It is 6:30AM"); 
         break; 
    case "Breakfast": 
         console.log("It is 7:00AM"); 
         break; 
    case "Drive to work": 
         console.log("It is 8:00AM"); 
         break; 
    case "Lunch": 
         console.log("It is 12:00PM"); 
         break; 
    case "Drive home": 
        console.log("It is 5:00PM");
         break; 
    case "Dinner": 
        console.log("It is 6:30PM");
         break; 
   }
console.log("\n");


let grade = "F";
//switch 버전
switch(grade){
    case "F":
    case "D":
        console.log("You've failed!");
        break;
    case "C":
    case "B":
        console.log("You've passed!");
        break;
    case "A":
        console.log("Nice!");
        break;
    default:
        console.log("I don't know this grade.");
}

//if문 버전
if(grade === "F" || grade === "D") {
    console.log("You've failed!");
  } else if(grade === "C" || grade === "B") {
    console.log("You've passed!");
  } else if(grade === "A") {
    console.log("Nice!");
  } else {
    console.log("I don't know this grade.");
  }
  