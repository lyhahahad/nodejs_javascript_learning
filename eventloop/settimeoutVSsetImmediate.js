// timeout_vs_immediate.js
setTimeout(() => {
    console.log('timeout');
  }, 0);
  
setImmediate(() => {
    console.log('immediate');
});
// timeout
// immediate

// immediate
// timeout
// 위의 두가지 결과가 모두 나올 수 있다.
// i/o 주기내에 있지 않기 때문에 메인 모듈에서 다음 스크립트를 실행한다면 두 타이머의 순서는 프로세스의 성능에 영향을 받으므로 결정적이지 않다.
// 이벤트루프를 보면 timers가 먼저 실행돼 timeout이 먼저 실행될 거라고 생각하지만 
//nonblocking 이라는 특성상 settimeout이 실행되면서 다음 코드인 immediate가 실행된다.
//또한 timers 루프는 앞서 스케줄링된 코드가 있다면 콜백이 지연될 수 있다.
 

// timeout_vs_immediate.js
// const fs = require('fs');

// fs.readFile("꾸준함.txt", () => {
//   setTimeout(() => {
//     console.log('timeout');
//   }, 0);
//   setImmediate(() => {
//     console.log('immediate');
//   });
// });

//i/o내에서는 무조건 immediate가 먼저 실행된다.
//poll 단계에 함께 포함되는데 poll 다음단계는 setimmediate콜백을 호출하는 check단계이기 때문이다.