// for of 문 사용해보기

let names = [];
for (i=0; i<10; i++){
    names.push(i);
}
console.log(names);

for(j=0; j<names.length; j++){
    console.log(names[j]);
}
console.log();

for(let name of names){
    console.log(name);
}