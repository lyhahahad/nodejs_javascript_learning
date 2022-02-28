const fs = require('fs');
const ITERATIONS_MAX = 2;
let iteration = 0;
Promise.resolve().then(() => {
    console.log('MAINLINE MICROTASK');
});
console.log('START', 'MAINLINE');
const timeout = setInterval(() => {
    console.log('START setInterval :' + iteration);
    if (iteration < ITERATIONS_MAX) {
        setTimeout((iteration) => {
            console.log('setInterval.setTimeout : ' + iteration );
            Promise.resolve().then(() => {
                console.log('setTimeout.Promise.resolve.then');
            });
        }, 0, iteration);
        fs.readdir('/aa', (err, files) => {
            console.log('fs.readdir() callback: Directory contains: ' + files.length + ' files', 'POLL PHASE');
            Promise.resolve().then(() => {
                console.log('fs.readdir().Promise.resolve.then');
            });
        });
        setImmediate(() => {
            console.log('setInterval.setImmediate', 'CHECK PHASE');
            Promise.resolve().then(() => {
                console.log('setImmediate.Promise.resolve.then');
            });
        });
    } else {
        console.log('Max interval count exceeded. Goodbye.', 'TIMERS PHASE');
        clearInterval(timeout);
    }
    console.log('END setInterval :' + iteration);
    iteration++;
}, 0);
console.log('END', 'MAINLINE');

/*
-mainline
START', 'MAINLINE
END', 'MAINLINE

-mainline microtasks
'MAINLINE MICROTASK

-timers
START setInterval :0
END setInterval :0

START setInterval :1
END setInterval :1

START setInterval :2
Max interval count exceeded. Goodbye.', 'TIMERS PHASE
END setInterval :2
-----
settimeout은 timers phase(타이머가 만료되면 실행되는 콜백)
fs.readdir은 poll phase(스케쥴링된 타이머가 없다면 기다렸다가 실행한다.)
setImmediate은 check phase (poll의 큐가 유휴상태라면 바로 실행된다.) 
모든 phase이후에는 micro tasks가 바로 실행된다.
'setInterval.setTimeout : ' + iteration 다음에 setTimeout.Promise.resolve.then 가 출력된다.
'fs.readdir() callback: Directory contains: 다음에 fs.readdir().Promise.resolve.then가 출력된다.
setInterval.setImmediate 다음에 'setImmediate.Promise.resolve.then가 출력된다.
다만 콜백으로 쌓여 있는 다른 실행이 있을 수 있기 때문에 바로 다음에 나오지는 않을 수 있다.
*/