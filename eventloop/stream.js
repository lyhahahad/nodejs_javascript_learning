/**
https://nodejs.dev/learn/nodejs-streams
stream은 nodejs 애플리케이션을 구동하는 기본 개념 중 하나이다.
파일 읽기/쓰기, 네트워크 통신 또는 모든 종류의 종단 간 정보 교환을 효율적인 방식으로 처리한다.
전통적인 방식과의 차이점은 파일을 처음부터 끝까지 읽징 낳고 필요한 조각을 읽고 모든 내용을 메모리에 유지하지 않고 처리한다는 점이다.
모든 스트림은 eventemitter이다
eventemitter은 이벤트를 처리하는 인스턴스이다.

stream을 사용하는 이유
1.메모리 효율성 : 처리전에 메모리에 많은 양의 데이터를 로드할 필요가 없다.
2.시간 효율성 : 전체 데이터 페이로드를 사용할 수 있을 때까지 기다리지 않고 데이터가 있는 즉시 처리를 시작할 수 있으므로 데이터 처리를 시작하는 데 시간이 훨씬 덜 걸린다.

예시
디스크에서 파일 읽어 오기.
*/

const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/aa.txt', (err, data) => {
    res.end(data)
  })
})
server.listen(3000)

/*stream을 활용한 예제 위의 코드와 같은 역할 수행.
콜백을 사용하지 않고 stream을 사용해 비동기 처리할 수 있다.
파일을 완전히 읽을 때까지 기다리지 않고 보낼 데이터가 준비되는 즉시 http 클라이언트로 스트리밍한다.
pipe 메서드는 file stream에서 호출된다.
pipe 끼리 연결도 가능하다.
*/
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt')
  stream.pipe(res)
})
server.listen(3000)
