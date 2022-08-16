//0부터 정해진 숫자를 더해서 100까지의 숫자 만들기

let counter = 0;
let step = 5;

do{
    counter += step;
    console.log(counter);
} while(!(counter >= 100));