// 아래 코드의 출력순서를 맞추시오.
const fs = require('fs');
const { STRING } = require('mysql/lib/protocol/constants/types');
const ITERATIONS_MAX = 3;
let iteration = 0;
let i = 0
let j = 0
console.log('START', 'MAINLINE');
const timeout = setInterval(() => {
    console.log(iteration)
    console.log('START: setInterval', 'TIMERS PHASE');
    if (iteration < ITERATIONS_MAX) {
        setTimeout(() => {
            console.log(i+'setTimeout');
            i++;
        });
        fs.readdir('\aa.txt', (err, files) => {
            // if (err) throw err;
            console.log(j+'fs.readdir');
            j++
        });
    } else {
        console.log('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        clearInterval(timeout);
    }
    iteration++;
    console.log('END: setInterval', 'TIMERS PHASE');
}, 0);
console.log('END', 'MAINLINE');

/*
내 풀이
timers 콜백 함수인 setinterval안에 timers 콜백인 settimeout과 poll 콜백인 fs가 3번 작동한다.
setinterval이 처음 실행되면 이벤트루프를 한 바퀴 돌고
돌아왔을 때 timer가 만료되면 콜백함수를 실행한다.
이때 settimeout timer가 실행되고 다음단계인 poll로 넘어가 fs가 실행된다. 
timers에 스케줄링돼 있기 때문에 poll 단계에서 fs가 반환할 때까지 기다리지 않고 다음단계로 넘어가고 다시 timers로 돌아가고
만약 여기서 timer가 만료됐다면 settimeout의 콜백이 실행된다.
그렇지 않다면 poll 단계로 넘어가고 poll에도 fs가 반환을 아직 못했다면 timers가 스케줄링 되있기 때문에 timers까지 다시 돌아간다.
만약 여기서 fs가 반환을 해주었다면 fs 콜백이 진행된다.
settimeout이 아니라 fs콜백이 먼저 실행될 수도 있다는 의미이다.
settimeout과 fs 콜백의 순서는 정해져있지 않다.
setinterval의 타이머는 위의 과정과 겹치면서 일정 시간이 지나면서 만료되고 콜백이 실행된다.
그렇게 되면 동시에 여러개의 settimeout, fs가 실행된다. 
타이머가 만료되거나 fs 실행이 완료된 콜백들이 순서와 관계없이 나온다.

-mainline
'START', 'MAINLINE'
'END', 'MAINLINE'

N번째 interval에서 실행된 setTimeout, fs.readdir는 n번째 'END: setInterval', 'TIMERS PHASE' 이후에 어떤 시점에든 나올 수 있고
0
'START: setInterval', 'TIMERS PHASE'
'END: setInterval', 'TIMERS PHASE'
1
'START: setInterval', 'TIMERS PHASE'
'END: setInterval', 'TIMERS PHASE'
2
'START: setInterval', 'TIMERS PHASE'
'END: setInterval', 'TIMERS PHASE'
3
'START: setInterval', 'TIMERS PHASE'
'Max interval count exceeded. Goodbye.', 'TIMERS PHASE'
'END: setInterval', 'TIMERS PHASE'

*/