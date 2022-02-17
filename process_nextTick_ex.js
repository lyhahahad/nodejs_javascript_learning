// https://blog.outsider.ne.kr/739
var http = require('http');

function compute() {
  // 복잡한 계산을 계속해서 수행한다
  // ...
  compute();
}
console.log(1111);
compute();

http.createServer(function(req, res) {
  console.log(1111);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(5000, '127.0.0.1');


/* process.nextTick없이 재귀를 사용하면 
호출 스택에 compute함수가 계속 쌓이게 된다.
이벤트 루프는 호출 스택이 모두 처리된 후에 이벤트 큐(대기열)을 살피기 때문에 다음 대기열에 있는
http 부분 코드가 실행되지 않게 된다.
즉 non-blocking 비동기 방식으로 작동하는 js가 blocking된다는 의미이다.
좀더 구체적으로 말하면 메인 스레드는 compute만 처리하게 된다.
하지만 nexttick을 사용하게 되면 호출 스택에 compute함수가 쌓이는 것이 아니라
이벤트 큐에 쌓이게 된다.
*/