/*
https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop
요약
-스택 : 함수 호출들의 프레임
아래 코드는 bar->foo순으로 스택에 쌓이고 foo->bar순으로 pop된다.
*/
function foo(b) {
    let a = 10
    return a + b + 11
  }
  
  function bar(x) {
    let y = 3
    return foo(x * y)
  }
  
  const baz = bar(7) 
/*
-힙 : 객체가 할당되는 곳, 메모리의 큰 영역을 지칭
-큐 : javascript 런타임은 메시지 큐, 즉시 처리할 메시지 대기열을 사용한다.
메시지를 처리하기 위한 함수가 연결돼있다.
오래된 메시지부터 큐에서 꺼내면 연결된 함수가 호출되고 스택 프레임이 생성된다.
스택이 빌 때까지 시행하고 큐에 남은 메시지를 같은 방식으로 처리한다.

*이벤트 루프
queue.waitForMessage()는 현재 처리할 수 있는 메시지가 존재하지 않으면 메시지가 도착할 때까지 동기적으로 대기한다.
*/
while(queue.waitForMessage()){
    queue.processNextMessage();
  }

/*
*"Run-to-completion"
각 메시지는 다른 메시지가 처리를 시작하기 전에 완전히 끝난다.
*/