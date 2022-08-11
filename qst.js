const theList = ['Laurence', 'Svekis', true, 35, null, undefined,
        {test: 'one',
         score: 55},
         ['one', 'two']];

theList.pop();
//theList.splice(2, 5);
theList.splice(2, 5, "MIDDLE","hello World", "LAST");
theList.shift();
theList.unshift("FIRST");
console.log(theList);

//["FIRST", "Svekis", "MIDDLE", "hello World", "LAST"] 이렇게 만들기

storeitem =[];

item1 ={
    name: "coffee",
    model: "americano",
    cost: 2000,
    quantity: 10
        }

item2 = {
    name: "protein bar",
    model: "post",
    cost: 1500,
    quantity: 20
}

item3 ={
    name:"iphone",
    model:"iphone 11 pro",
    cost: 80000,
    quantity: 5
}

storeitem.push(item1);
storeitem.push(item2);
storeitem.push(item3);
console.log(storeitem);

console.log(`${storeitem[0].model} quantity: ${storeitem[0].quantity}`);
console.log(`${storeitem[1].model} quantity: ${storeitem[1].quantity}`);
console.log(`${storeitem[2].model} quantity: ${storeitem[2].quantity}`);