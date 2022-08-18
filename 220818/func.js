/*
let youGotThis = function () {
    console.log("You're doing really well, keep coding!");
  };
setTimeout(youGotThis, 1000); // 1초 뒤에 찍게 해줌
setInterval(youGotThis, 1000); //매 1초 간격으로 결과값 출력
*/

// 재귀함수
function getRecursive(nr) {
    console.log(nr);
    if (nr > 0) {
      getRecursive(--nr);
    }
  }
  getRecursive(3);


  function logRecursive(nr) {
    console.log("Started function:", nr);
    if (nr > 0) {
      logRecursive(nr - 1);
    } else {
        console.log("done with recursion");
    }
    console.log("Ended function:", nr);
  }
  logRecursive(3);
  