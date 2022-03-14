node의 이벤트 루프는 싱글 스레드로 작동합니다. 하지만 일부 연산들을 libuv를 통해 os커널이나 thread pool에서 실행하기 때문에 전체적인 운영은 멀티 스레드라고 볼 수 있다.
멀티 코어 환경에서도 작업을 효율적으로 분산시킨다면 멀티 코어를 적절하게 활용할 수 있다.
위에서 말한 것처럼 이벤트 루프는 싱슬 스레드로 작동한다. 때문에 block될 경우 다음 i/o가 실행되지 않을 수 있다. 때문에 이벤트 루프내에서 구동되는 코드의 경우 많은 연산을 요구하는 것을 빼는 것이 좋다.

1. timers : settimeout, setinterval로 스케쥴링된 콜백 실행
2. pending callbacks : 다음 루프 반복으로 연기된 i/o 콜백 실행
3. idle, prepare : 내부용으로만 사용.
4. poll : 새로운 i/o 이벤트 가져옴. i/o관련 콜백 실행 timers에 실행되는 콜백을 제외하면 거의 이 단계에서 실행된다. 스케쥴링된 timer가 없다면 역시 block되기도함.
5. check setimmediate 콜백이 실행됨.
6. close callbacks
