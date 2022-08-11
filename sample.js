let dog = { dogName: "JavaScript", 
            weight: 2.4, 
            color: "brown", 
            breed: "chihuahua", 
            age: 3, 
            burglarBiter: true 
          };
let dogColor2 = dog.color; // 딕셔너리 안의 value값 지정하기
//console.log(dogColor2); 

dog["color"] = "blue"; // 지정된 value값을 변경하기
dog.weight = 2.3;
//console.log(dog);

let variable = "age"; // 변수로 치환해서 value값을 출력할 수도 있다.
//console.log(dog[variable]);

variable = "breed";
//console.log(dog[variable]);

// 연습문제
let myCar = {
    모델: 'LIRO',
    제조사: 'kia',
    제조년도: 2023,
    종류: '소형SUV',
    forsale: 100,
    color: 'blue'
}
let mycolor = "color";
myCar[mycolor] = 'white';
myCar["forsale"] = true;

console.log(myCar.모델+", "+myCar.제조사);
console.log(`forsale: ${myCar.forsale}`);



let company = { companyName: "Healthy Candy",
                activity: "food manufacturing",
                address: {
                  street: "2nd street",
                  number: "123",
                  zipcode: "33116",
                  city: "Miami",
                  state: "Florida"
                },
                yearOfEstablishment: 2021 
              };

company.address.zipcode = "33117"; // 객체 안의 객체 요소 꺼내서 변경하기
company["address"]["number"] = "100";
console.log(company.address.zipcode+", "+company.address.number);

company = { companyName: "Healthy Candy",
                activities: ["food manufacturing", //객체 안에 배열이 있는 구조
                            "improving kids' health", "manufacturing toys"],
                address: {
                  street: "2nd street",
                  number: "123",
                  zipcode: "33116",
                  city: "Miami",
                  state: "Florida"
                },
                yearOfEstablishment: 2021 
              };
let activity = company.activities[1];
console.log(activity);


let addresses = [{
    street: "2nd street",
    number: "123",
    zipcode: "33116",
    city: "Miami",
    state: "Florida"
  },
  {
    street: "1st West avenue",
    number: "5",
    zipcode: "75001",
    city: "Addison",
    state: "Texas"
  }];
  // 배열 요소가 각각 객체인 경우
let streetName = addresses[0].street;
console.log(streetName);


//연습2
people = {friends:[]}

firend1 = {
    lastname: 'jin',
    firstname: 'koo',
    ID:45325
}

firend2 = {
    lastname: 'hee',
    firstname: 'kim',
    ID:12345
}

firend3 = {
    lastname: 'min',
    firstname: 'ryu',
    ID:56732
}

people.friends.push(firend1);
people.friends.push(firend2);
people.friends.push(firend3);

//console.log(people.friends[0],"\n",people.friends[1],"\n",people.friends[2]);
console.log(people);