//continue 사용하기
string = [];
let seven ='str7';

for(i=0; i<10; i++){
    string.push('str'+ i);
}

for (j=0; j<10; j++){
    if (string[j] === seven){
        continue;
    }
    string.push('str'+ j);
}
console.log(string);


//break 사용하기
string1 = [];
for(i=0; i<10; i++){
    string1.push('str'+ i);
}

for (j=0; j<10; j++){
    if (string1[j] === seven){
        break;
    }
    string1.push('str'+ j);
}
console.log(string1);
