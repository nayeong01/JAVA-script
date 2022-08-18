function getNum(x) {
    console.log(x);
    if(x <= 10){
        getNum(++x);
    }
}
getNum(0);