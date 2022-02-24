/*
https://developer.ibm.com/tutorials/learn-nodejs-the-event-loop/
요약 정리
https://developer.ibm.com/developer/default/tutorials/learn-nodejs-the-event-loop/images/figure-1.png
-메인라인
javascript 코드는 node thread에서 실행된다.
메인라인은 위에서 아래로 실행한다.
메인라인의 일부로 non-blocking 코드를 한 번만 호출해도 해당 호출에 전달한 콜백은 메인라인이 모두 실행된 이후에 이벤트 루프에 의해 실행된다.
메인라인->non-blocking 코드 이벤트 루프에의해 실행.
만약 non-blocking call이 없다면 event loop는 아무것도 하지 않고 node process가 끝난다.

-Callback queue
모든 phase에는 FIFO 콜백 큐가 존재한다. 

-Microtasks
Microtasks는 메인라인과 모든 이벤트루프의 every phase 이후에 실행된다.
process.nextTick(), then()에서 발생하는 콜백함수를 실행한다.

-Timers phase
만료된 타이머 콜백은 이벤트 루프의 이 단계에서 실행됩니다.
setTimeout, setInterval 콜백을 실행한다.
Timeout 타이머는 타이머가 만료된 후 가능한 한 빨리 콜백을 실행하는 노드 객체이다.
타이머가 만료되면 이벤트 루프의 다음 타이머 단계에서 콜백이 호출된다.
setinterval : 콜백이 타이머가 만료될 때마다 한 번 실행되고 노드 프로세스가 살아있는 동안 반복된다.
실행할 만료된 타이머 콜백이 더이상 없으면 이벤트 루프는 모든 마이크로태스크를 실행한다. 
마이크로태스크 실행 후 이벤트 루프는 pending단계로 이동한다.

-pending->idle and prepare phase은 시스템 수준의 내부적 수준의 콜백이기 때문에 해당 문서에서는 자세하게 설명하지 않는다.

-Poll phase
I/O콜백을 실행하는 단계
fs.readfile과 같은 함수의 콜백이 진행된다.
poll queue가 비어있다면 이것은 I/O 오퍼레이션이 끝날 때까지 BLOCK하고 콜백을 즉시 실행한다.
하지만 Timers가 스케줄링돼 있다면 poll 단계는 끝난다.
직후에는 microtasks가 실행되고 check 단계로 넘어간다.

-Check phase
post I/O 단계로 setImmediate() 콜백이 실행된다.
poll 단계가 끝나자마자 실행되는 코드를 작성할 수 있다.
check queue가 비어이씅면 모든 마이크로태스크가 실행된고 이벤트 루프는 닫힌다.

-close phase
close단계는 node 프로세스가 끝나거나 Timers phase로 넘어간다.
*/

/*

*/
const logger = require('../common/logger');
const ITERATIONS_MAX = 5;
let iteration = 0;
logger.info('START', 'MAINLINE');
const timeout = setInterval(() => {
    logger.info('START: setInterval', 'TIMERS PHASE');
    if (iteration >= ITERATIONS_MAX) {
        logger.info('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        clearInterval(timeout);
    }
    iteration++;
    logger.info('END: setInterval', 'TIMERS PHASE');
}, 10);
logger.info('END', 'MAINLINE');