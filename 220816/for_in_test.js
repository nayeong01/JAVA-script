//객체랑 배열을 for in 문으로 출력하기

let items={
    Name: "americano",
    cost: 2000,
    quantity: 100
};

for(let item in items){
    console.log(`${item} : ${items[item]}`);
}; // 객체 안의 프로퍼티와 값을 따로따로 출력이 가능하다.

console.log();


let itemsArr = [
    'Name : latte',
    'cost : 3000',
    'quantity : 150'
];

for (let item in itemsArr){
    console.log(item, itemsArr[item]);
}; // 배열도 프로퍼티가 있지만, 객체와 달리 인덱스값이 출력이 된다.