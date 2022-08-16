/* 중첩된 반복문 */
let arrOfArrays = [];
for (let i = 0; i < 3; i++){
  arrOfArrays.push([]);
  for (let j = 0; j < 7; j++) {
    arrOfArrays[i].push(j);
  }
}
console.log(arrOfArrays);
console.table(arrOfArrays); //이거 신기하다


// 반복문과 배열
let names = ["Chantal", "John", "Maxime", "Bobbi", "Jair"];
for (let i = 0; i < names.length; i ++){
  console.log(names[i]);
}

let names1 = ["Chantal", "John", "Maxime", "Bobbi", "Jair"];
for (let i = 0; i < names1.length; i ++){
  names1[i] = "hello " + names1[i];
}
console.log(names1);

let names2 = ["Chantal", "John", "Maxime", "Bobbi", "Jair"]; 
for (let i = 0; i < names2.length; i ++){ 
  if(names2[i].startsWith("M")){ // M으로 시작되는 이름 고르기
    delete names2[i]; // if문 조건에 걸린 요소 삭제하기
    continue;
  }
  names2[i] = "hello " + names2[i]; 
} 
console.log(names2);


//무한루프 
let names3 = ["Chantal", "John", "Maxime", "Bobbi", "Jair"]; 
for (let i = 0; i < names3.length; i++){ 
  names.push("...")
}



// for of 반복문 //
let names4 = ["Chantal", "John", "Maxime", "Bobbi", "Jair"];
for (let name of names4){
  console.log(name);
}


//for in 반복문 // 
let car = {
    model: "Golf",
    make: "Volkswagen",
    year: 1999,
    color: "black",
  };

for (let prop in car){
    console.log(car[prop]);
}

for (let prop in car){
    console.log(prop);
}

//객체를 배열로 바꿔서 반복하기//

let car1 = {
  model: "Golf",
  make: "Volkswagen",
  year: 1999,
  color: "black",
};

let arrKeys = Object.keys(car1);
console.log(arrKeys);

for(let key of Object.keys(car1)) {
  console.log(key);
}

for(let key of Object.values(car1)) {
  console.log(key);
}

let arrKeys1 = Object.keys(car1);
for(let i = 0; i < arrKeys1.length; i++) {
  console.log(arrKeys1[i] + ": " + car1[arrKeys1[i]]);
}

let arrEntries = Object.entries(car1);
console.log(arrEntries);

for (const [key, value] of Object.entries(car)) {
  console.log(key, ":", value);
}


//break 와 continue
for (let i = 0; i < 10; i++) {
  console.log(i);
  if (i === 4) {
    break;
  }
}

notFound = true;
while (superLongArray.length > 0 && notFound) { //명확한 조건을 적어주는게 좋음
  if (superLongArray[0] != 42) {
    superLongArray.shift(); // 첫번째 요소 삭제하기
  } else {
    console.log("Found 42!");
    notFound = false;
  }
}

let i = 1;
while (i < 50) { 
  if (i % 2 === 0){
    continue;
  }
  console.log(i);
  i++;
}
// 무한루프의 오류 중 하나
// if문에 걸리게 되면 i는 그 상태로 무한반복 상태에 빠지게 된다

let j = 1;
while (j < 50) {
  j++;
  if ((j-1) % 2 === 0){
    continue;
  }
  console.log(j-1);
}


//for문 응용해보기
let groups = [
  ["Martin", "Daniel", "Keith"],
  ["Margot", "Marina", "Ali"],
  ["Helen", "Jonah", "Sambikos"],
];

for (let i = 0; i < groups.length; i++) {
  let matches = 0;
for (let j = 0; j < groups[i].length; j++) {
  if(groups[i][j].startsWith("M")){ // M으로 시작하는 단어 찾기
      matches++;
    } else {
      continue;
    }
  if (matches === 2){
    console.log("Found a group with two names starting with an M:");
    console.log(groups[i]);
    break;
    }
  }
}

for (let group of groups){
  for (let member of group){
    if (member.startsWith("M")){
      console.log("found one starting with M:", member);
      break;
    }
  }
}


//outer & inner
outer:
for (let group of groups) {
  inner:
  for (let member of group) {
    if (member.startsWith("M")) {
      console.log("found one starting with M:", member);
      break outer; //아예 outer쪽까지 멈추게 한다. 따라서 하나만 나오고 반복문 끝.
    }
  }
}