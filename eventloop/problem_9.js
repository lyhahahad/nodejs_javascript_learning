// https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/
// process.nextTick() 부분 예제 2개
/*
process.nextTick()은 비동기 api이지만 기술적으로는 이벤트 루프의 일부가 아니다.
nextTickQueue는 이벤트 루프의 현재 단계와 관계없이 현재 작업이 완료된 후에 처리도니다.
만약 재귀적으로 사용하게 되면 논블로킹 i/o 프로세스를 블로킹하게 될 수 있습니다.

*/
function apiCall(arg, callback) {
    if (typeof arg !== 'string')
      return process.nextTick(
        callback,
        new TypeError('argument should be string')
      );
  }
console.log("mainline_1")
apiCall(1,()=>{
    console.log("process.nextTick")
})
console.log("mainline_2")

console.log("mainline_3")

/**
 * mainline_1
 * mainline_2
 * mainline_3
 * process.nextTick
 * mainline이 다실행된 후에 processTick()의 callback 함수가 실행된다.
 */