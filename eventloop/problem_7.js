// timeout_vs_immediate.js
// console.log("Main Line_1")

// setImmediate(() => {
//     console.log('immediate');
//   });

// console.log("Main Line_2")

// setTimeout(() => {
//     console.log('timeout');
//   }, 10);

// console.log("Main Line_3")

/**
 * Main Line_1
 * Main Line_2
 * Main Line_3
 * timeout or immediate
 * timeout은 타이머가 만료되었을 때
 * immediate는 poll 단계가 완료되거나 비어있을 때 실행된다.
 * i/o 주기 내에 있지 않기 때문에 프로세스 선능에 영향을 받아 결정적이지 않다.
 */

 const fs = require('fs');

 fs.readFile(__filename, () => {
   setTimeout(() => {
     console.log('timeout');
   }, 0);
   setImmediate(() => {
     console.log('immediate_1');
   });
   setImmediate(() => {
    console.log('immediate_2');
  });
 });

 /**
  * i/o 주기내에서 setimmediate는 타이머 phase에서 실행되는 코드보다 먼저 실행된다.
  */