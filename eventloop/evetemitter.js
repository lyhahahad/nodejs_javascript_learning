/**
https://nodejs.dev/learn/the-nodejs-event-emitter
자바스크립트로 브라우저를 다루다 보면 마우스 클릭, 키보드 입력, 마우스 움직임 등 다양한 event를 다뤄야 합니다.
event를 사용해 이런 상호작용을 처리할 수 있습니다.
emit는 event를 발생시킨다.
on은 event가 발생할 때 실행될 콜백 함수를 추가하는 데 사용한다.
once() : 일회성 리스너 추가.
removeListener()/off() : 이벤트에서 이벤트 리스너 제거
removeAllListeners() : 모든 리스너 제거
*/
const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
    console.log('started')
  })

eventEmitter.emit('start')