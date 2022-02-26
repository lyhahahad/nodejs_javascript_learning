const fs = require('fs');
const ITERATIONS_MAX = 3;
let iteration = 0;
console.log('START', 'MAINLINE');
const timeout = setInterval(() => {
    console.log(iteration)
    console.log(iteration,'START: setInterval');
    if (iteration < ITERATIONS_MAX) {
        setTimeout(() => {
            console.log( 'setTimeout');
        });
        fs.readdir('/aa.txt', (err, files) => {
            console.log( 'readdir');
        });
        setImmediate(() => {
            console.log( 'setImmediate');
        });
    } else {
        console.log('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        clearInterval(timeout);
    }    
    console.log(iteration,'END: setInterval');
    iteration++;
}, 0);
console.log('END', 'MAINLINE');

/*
mainline 실행 후 microtasks가 없기 때문에 timers로 넘어간다.
timers에서 setinterval이 실행되면서 타이머가 실행되고 이벤트 루프가 실행되면서 타이머가 만료되면
콜백이 실행된다.
setTimeout는 timers에
fs.readdir는 poll에
setImmediate는 check에서 실행된다.
동시에 setinterval이 타이머는 계속 돌아가기 때문에 계속 타이머가 지속적으로 만료되면서 콜백이 추가된다.
setTimeout, fs.readdir는 만료 시점이 다 다르기 때문에 출력이 다르지만 n번째 setinterval 이후에 n번째 setTimeout, fs.readdir가 실행된다.
다만 setImmediate의 경우 post I/O로 poll 단계가 유휴 상태일 때 실행된다.
유휴상태의 정확한 의미는 poll의 event queue가 비어있다는 의미이다.

i번째 setTimeout, fs.readdir, setImmediate는 해당 iteration end : setinterval 이후에 실행된다.
setImmediate는 fs.readdir의 콜백이 실행되지 않아도 setImmediate가 출력될 수 있다.
poll 단계의 콜백은 스케쥴링된 timer가 있다면 i/o를 기다리지 않고 다음단계로 넘어가므로 setImmediate는 f

'START', 'MAINLINE'
'END', 'MAINLINE'
0
'0START: setInterval'
'0END: setInterval'
1
'1START: setInterval'
'1END: setInterval'
2
'2START: setInterval'
'2END: setInterval'
3
'3START: setInterval'
'Max interval count exceeded. Goodbye.', 'TIMERS PHASE'
'3END: setInterval'

--------------------------
START MAINLINE
END MAINLINE
0
0 START: setInterval
0 END: setInterval
setImmediate
setTimeout
1
1 START: setInterval
1 END: setInterval
readdir
readdir
setImmediate
setTimeout
2
2 START: setInterval
2 END: setInterval
setImmediate
setTimeout
3
3 START: setInterval
Max interval count exceeded. Goodbye. TIMERS PHASE
3 END: setInterval
readdir

*/