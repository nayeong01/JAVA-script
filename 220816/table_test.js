let myTable = [];
//tempTable = [];
let num1 = 3;
let num2 = 7;
let counter = 0;

for (let i = 0; i < num1; i++){
    let tempTable =[];
    for (let j = 0; j < num2; j++) {
        counter +=1;
        tempTable.push(counter);
    }
    //console.table(tempTable);
    myTable.push(tempTable);
  }
//myTable.push(tempTable);
console.table(myTable);