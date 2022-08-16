// 짝수 레슨 때 true 나오는 반복문 만들기

myWork = [];

for (i=1; i<11; i++){
    let bool = i % 2 == 0? true:false;
    let lesson = `name: Lesson${i}, status: ${bool}`;
    myWork.push(lesson);
}
console.log(myWork);