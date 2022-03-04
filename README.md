### nodejs_javascript_learning
## 목적 <br> 
nodejs와 javascript는 문법이 쉬워 초보자들이 진입하지만 비동기 작동 방식과 event loop등 구체적인 작동 방식을 모른다면 제대로 사용할 수 없다.<br> 때문에 nodejs와 javascript의 구체적인 작동 방식을 이해하고자 한다.<br>

## 목차<br>
# 1.event loop를 이해한다.<br>
1.mainline 실행<br>
2.microtasks 실행 : promise.then(), process,nextTick()가 실행된다.<br>
3.event loop 실행<br>
3-a timers phase : settimeout, setinterval 콜백 함수를 실행한다. 타이머가 만료되면 timers  큐에 enque돼 실행된다.<br>
microtasks실행<br>
3-b poll phase : i/o와 관련된 콜백 함수가 실행된다. fs가 대표적이다. 스케쥴링된 timer가 없다면 입력이 들어올 때까지 기다린다.<br>
microtasks실행 <br>
3-c check phase : setimmediate 콜백 함수가 실행된다. poll phase가 유휴상태일 때 실행한다.<br>
microtasks실행<br>
5줄 요약 정리<br>
# 2.stream + eventemitter<br>

참고 문서<br>
https://developer.ibm.com/tutorials/learn-nodejs-the-event-loop/<br>
https://developer.ibm.com/tutorials/learn-nodejs-node-basic-concepts/<br>
https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop<br>
https://nodejs.dev/learn/the-nodejs-event-emitter<br>
https://nodejs.dev/learn/nodejs-streams<br>