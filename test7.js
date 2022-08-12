/* 친구 확인 게임 */

let friName = prompt("친구 이름을 입력하세요!");
switch(friName){
    case "hyun":
    case "jin":
    case "min":
    case "woo":
        console.log(`${friName}은/는 당신의 친구가 맞습니다!`);
        break;
    case "alice":
    case "john":
        console.log(`${friName}은/는 당신의 친구가 아닙니다!`);
        break;
    default:
        console.log(`${friName}은/는 당신의 친구인지 아닌지 모르겠습니다!`);
}

