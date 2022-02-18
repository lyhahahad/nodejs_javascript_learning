// https://blog.outsider.ne.kr/739
//하이라이트
//non-blocking인 js를 blocking처럼 쓰지 않기 위해서는 호출 스택에 많은 연산이 쌓이는 코드를 줄여야 한다.
//쓰게 된다하더라도 단일 스레드를 적절하게 나눠쓰기 위해 process.nextTick()을 사용해야 non-blocking으로 사용할 수 있다.
/*
nodejs는 싱글 스레드로 동작하기 때문에 멀티 코어상에서 병렬 처리의 이점을 얻을 수 없다.
즉 cpu 작업량이 많은 작업에 적합하지 않다는 것이다.
예를 들어 재귀문 같은 것이 있을 수 있다.
주로 i/o가 많은 작업에 많이 쓰이긴하지만 cpu 작업량이 많은 코드를 사용하지 않는 것은 아니다.
nextTick은 cpu 작업이 많은 코드를 처리할 때 주로 쓰인다.
*/
function foo() {
  console.log('foo');
}
function foo_1() {
  console.log('foo_1');
}

process.nextTick(foo);
console.log('bar');
//bar->foo

setTimeout(foo_1, 0);
console.log('bar');

//bar->foo
// 참고 : settimeout은 올드 콜백함수로 반환된 코드가 호출 스택이 아니라 이벤트 큐에 enque된다.
//즉 nextTick도 마찬가지로 작동한다.
//이벤트 루프는 호출 스택이 모두 끝나야 이벤트 큐를 참조한다.
//확인 필요한 부분.


/*
compute함수를 재귀로 처리해 많은 연산이 필요한 코드가 추가됐다.
compute함수는 비동기 함수가 아니기 때문에 메인 스레드에서 작동한다.
즉 호출 스택에 compute가 계속 쌓여 stack 용량 오류가 발생할 수 있다.
이문제를 해결하기 위해 process.nextTick()으로 처리하는 것이다.
이 함수를 사용하면 다른 이벤트를 처리하면서 compute를 실행할 수 있다.
이벤트루프의 다음 tick(이벤트 대기열의 다음 순서)로 미루기 때문에 http요청이 들어오면 compute가 호출되기 전에 처리된다.
*/
var http = require('http');

function compute_1() {
  // 복잡한 계산을 계속해서 수행한다
  // ...
  console.log("compute")
  process.nextTick(compute_1);
  // compute()
}

function compute_2() {
  // 복잡한 계산을 계속해서 수행한다
  // ...
  console.log("compute_2")
  process.nextTick(compute_2);
  // compute()
}

function compute_3() {
  // 복잡한 계산을 계속해서 수행한다
  // ...
  console.log("compute_3")
  process.nextTick(compute_3);
  // compute()
}

compute_1();
compute_2();
compute_3();