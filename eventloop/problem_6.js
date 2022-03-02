// The Node EventEmitter
const EventEmitter = require('events');
// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();
console.log('START', 'MAINLINE');
console.log('Registering simpleEvent handler', 'MAINLINE');
// eventEmitter.once() : 특정 이벤트에 대해 최대 한 번만 호출되는 리스너를 등록할 수 있습니다. 
eventEmitter.on('simpleEvent', (eventName, message, source, timestamp) => {
    console.log('Received event: ' + timestamp + ': ' + source + ':[' + eventName + ']: ' + message, 'EventEmitter.on()');
});

// Get the current time
let hrtime = process.hrtime();
// eventEmitter.emit() : 이벤트를 트리거하는 데 사용됩니다.
// 위에 on을 통해 만들어진 simpleEvent를 실행한다. 
eventEmitter.emit('simpleEvent', 'simpleEvent', 'Custom event says what?', 'MAINLINE', (hrtime[0] * 1e9 + hrtime[1]) / 1e6);

console.log('END', 'MAINLINE');

/*
START MAINLINE
Registering simpleEvent handler MAINLINE
Received event: 355626988.108299: MAINLINE:[simpleEvent]: Custom event says what? EventEmitter.on()
END MAINLINE
event는 메인라인에서 함께 실행된다.
만약 event에 루프가 걸리면 block될 수도 있다.
*/

console.log('START', 'MAINLINE');
console.log('Registering simpleEvent handler', 'MAINLINE');

eventEmitter.on('simpleEvent_2', (eventName, message, source, timestamp) => {
    while(true){
        
    }
    console.log('Received event: ' + timestamp + ': ' + source + ':[' + eventName + ']: ' + message, 'EventEmitter.on()');
});

eventEmitter.emit('simpleEvent_2', 'simpleEvent', 'Custom event says what?', 'MAINLINE', (hrtime[0] * 1e9 + hrtime[1]) / 1e6);

console.log('END', 'MAINLINE');

/*
START MAINLINE
Registering simpleEvent handler MAINLINE
메인라인에서 while 문이 무한 반복되기 때문에 block된다.
이런 코드는 주의 해야 한다.
*/