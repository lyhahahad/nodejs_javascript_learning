const fs = require('fs');
const ITERATIONS_MAX = 2;
let iteration = 0;
process.nextTick(() => {
    console.log('process.nextTick', 'MAINLINE MICROTASK');
});
console.log('START', 'MAINLINE');
const timeout = setInterval(() => {
    console.log("setInterval start : ",iteration);

    if (iteration < ITERATIONS_MAX) {
        setTimeout((iteration) => {
            console.log("setTimeout" + iteration);
            process.nextTick(() => {
                console.log('setTimeout.process.nextTick');
            });
        }, 0, iteration);
        fs.readdir('/aa.txt', (err, files) => {
            console.log('fs.readdir()' + iteration);
            process.nextTick(() => {
                console.log('fs.readdir.process.nextTick');
            });
        });
        setImmediate(() => {
            console.log('setImmediate');
            process.nextTick(() => {
                console.log('setImmediate.process.nextTick');
            });
        });
    } else {
        console.log('Max interval count exceeded. Goodbye.');
        clearInterval(timeout);
    }
    console.log('setInterval end : ' + iteration);
    iteration++;
}, 0);
console.log('MAINLINE: END');

/*
'START', 'MAINLINE'
'MAINLINE: END'
'process.nextTick', 'MAINLINE MICROTASK'
--------------------
setTimeout, fs.readdir, setImmediate는 n번 째 setinterval 실행 이후 나온다. 
순서는 타이머, 실행 만료 시점에 의해 결정되기 때문에 명확하지 않다.
process.nextTick은 포함된 콜백의 출력 다음에 나온다. 그사이에 다른 콜백이 들올 수 있어 바로 붙어서 실행되지 않을 수 있다.
setImmediate는 poll 콜백 큐가 비어있을 때 check로 넘어가서 실행되는 것이므로 fs.readdir 실행전에 실행될 수도 있다.
--------------------
setInterval start : 0
'setInterval end : ' + 0

setInterval start : 1
'setInterval end : ' + 1

setInterval start : 2
Max interval count exceeded. Goodbye.
'setInterval end : ' + 2
*/