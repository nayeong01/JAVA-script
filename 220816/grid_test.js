// 그리드 만들기 // 어려움ㅜㅜ

let counter = 0;
let row;
let cells = 64;
let grid = [];

for(i=0; i<cells + 1; i++){
    if(counter % 8 ==0){
        if(row != undefined){ // 이게 구체적으로 뭘 의미하는지 모르겠어
            grid.push(row);
        }
        row = [];
    }
    counter++;
    let temp = counter;
    row.push(temp);
}
console.table(grid);