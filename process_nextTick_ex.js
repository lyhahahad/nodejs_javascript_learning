// https://blog.outsider.ne.kr/739
//하이라이트
// 이벤트 루프는 가능하다면 언제나 시스템 커널에 작업을 넘겨서 Node.js가 논 블로킹 I/O 작업을 수행하도록 해줍니다.
//non-blocking인 js를 blocking처럼 쓰지 않기 위해서는 호출 스택에 많은 연산이 쌓이는 코드를 줄여야 한다.
//쓰게 된다하더라도 단일 스레드를 적절하게 나눠쓰기 위해 process.nextTick()을 사용해야 non-blocking으로 사용할 수 있다.
/*
nodejs는 싱글 스레드로 동작하기 때문에 멀티 코어상에서 병렬 처리의 이점을 얻을 수 없다.
즉 cpu 작업량이 많은 작업에 적합하지 않다는 것이다.
이벤트 루프는 가능하다면 언제나 시스템 커널에 작업을 넘겨서 Node.js가 논 블로킹 I/O 작업을 수행하도록 해줍니다.
예를 들어 재귀문 같은 것이 있을 수 있다.
대부분의 현대 커널은 멀티 스레드이므로 백그라운드에서 다수의 작업을 실행할 수 있습니다. 
이러한 작업 중 하나가 완료되면 커널이 Node.js에게 알려주어 적절한 콜백을 poll 큐에 추가할 수 있게 하여 결국 실행되게 합니다. 
node js는 스크립트를 받아 실행할 때 비동기 api를 호출하거나 스케줄링된 타이머를 사용하거나 process.nextTick()를 호출할 수 있습니다. 그 다음 이벤트 루프 처리를 시작합니다.
주로 i/o가 많은 작업에 많이 쓰이긴하지만 cpu 작업량이 많은 코드를 사용하지 않는 것은 아니다.
nextTick은 cpu 작업이 많은 코드를 처리할 때 주로 쓰인다.
이벤트 루프 순서 : timer-> pending callback -> idle, prepare-> poll-> check-> close callback
각 단계는 콜백의 fifo 큐를 가진다.
큐를 모두 소진하거나 콜백 제한에 이르면 이벤트 루프는 다음 단계로 이동한다.

-timers: 이 단계는 setTimeout()과 setInterval()로 스케줄링한 콜백을 실행합니다.
타이머는 지정된 시간에 정확히 실행한다는 의미가 아니라 해당 시간 이후 진행한다는 의미로 보는 것이 적합하다.
구체적으로는 지정된 시간 이후에 스케줄링된 가장 빠른 시간에 진행한다는 의미이다.
-pending callbacks: 다음 루프 반복으로 연기된 I/O 콜백들을 실행합니다.
tcp오류 같은 시스템 작업의 콜백을 실행한다. 
-idle, prepare: 내부용으로만 사용합니다.
-poll: 새로운 I/O 이벤트를 가져옵니다. I/O와 연관된 콜백(클로즈 콜백, 타이머로 스케줄링된 콜백, setImmediate()를 제외한 거의 모든 콜백)을 실행합니다. 적절한 시기에 node는 여기서 블록 합니다.
i/o를 얼마나 오래 블록하고 폴링해야 하는지 계산한다.
2.poll큐에 있는 이벤트 처리
루프가 poll 단계이고 스케줄링된 timers가 없다면 두가지중 하나의 상황이 발생한다.
pool큐가 비어있지 않다면 이벤트 루프가 콜백의 큐를 순회하면서 큐를 다 소진하거나 시스템 의존적인 하드 한계에 도달할 때까지 동기로 콜백을 처리한다.
pool큐가 비어있다면 
setImmediate(poll의 다음 단계인 check에서 실행되는 코드)로 스케줄링이 된 경우 poll단계를 종료하고 스케줄링된 스크립트를 실행하기 위해 check단계로 넘오감
안된경우에는 콜백이 큐에 추가되기를 기다린 후 즉시 실행한다.
-check: setImmediate() 콜백은 여기서 호출됩니다.
setImmediate로 큐가 추가되면 이벤트 루프를 기다리지 않고 check단계 지속.
-close callbacks: 일부 close 콜백들, 예를 들어 socket.on('close', ...).
소켓이나 핸들이 갑자기 닫힌 경우에 실행된다.
그렇지 않다면 process.nextTick()으로 넘어간다.

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