let countOne = () => {
    console.log("one");
} 

let countTwo = () => {
    console.log("two");
} 

let countThree = () => {
    console.log("three");
    countOne();
    countTwo();
} 

let countFour = (x) =>{
    console.log("four");
    setTimeout(countOne, 100);
    countThree();
}
countFour();