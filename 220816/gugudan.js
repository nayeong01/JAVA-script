gugu =[];

let num1 =9;
let num2 =9;

for(i=0; i<num1; i++){
    let temp = [];
    for(j=0; j<num2; j++){
        temp.push(`${j+1}X${i+1}=${(i+1)*(j+1)}`);
    }
    gugu.push(temp);
}
console.table(gugu);

