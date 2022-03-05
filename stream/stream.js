/**
https://nodejs.dev/learn/nodejs-streams
https://mylko72.gitbooks.io/node-js/content/chapter5/chapter5_2.html
stream은 nodejs 애플리케이션을 구동하는 기본 개념 중 하나이다.
stream은 Node.js에서 스트리밍 데이터 작업을 위한 추상 인터페이스입니다. 
stream 모듈은 stream 인터페이스를 구현하기 위한 API를 제공합니다.

파일 읽기/쓰기, 네트워크 통신 또는 모든 종류의 종단 간 정보 교환을 효율적인 방식으로 처리한다.
전통적인 방식과의 차이점은 파일을 처음부터 끝까지 읽징 낳고 필요한 조각을 읽고 모든 내용을 메모리에 유지하지 않고 처리한다는 점이다.
모든 스트림은 eventemitter이다
eventemitter은 이벤트를 처리하는 인스턴스이다.
data stream : 연결지향통신에서, 전송된 정보를 수집하거나 정보를 전송할 때 사용되는 디지털 방식으로 암호화된 일관된 신호의 흐름을 말한다. 
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

const server_2 = http.createServer((req, res) => {
  const stream = fs.createReadStream(__dirname + '/data.txt')
  stream.pipe(res)
})
server_2.listen(3000)

/*
-Node.js 핵심 모듈
process.stdinstdin에 연결된 스트림을 반환합니다.
process.stdoutstdout에 연결된 스트림을 반환
process.stderrstderr에 연결된 스트림을 반환합니다.
fs.createReadStream()파일에 읽을 수 있는 스트림을 만듭니다.
fs.createWriteStream()파일에 쓰기 가능한 스트림 생성
net.connect()스트림 기반 연결을 시작합니다.
http.request()쓰기 가능한 스트림인 http.ClientRequest 클래스의 인스턴스를 반환합니다.
zlib.createGzip()gzip(압축 알고리즘)을 사용하여 데이터를 스트림으로 압축
zlib.createGunzip()gzip 스트림의 압축을 풉니다.
zlib.createDeflate()deflate(압축 알고리즘)를 사용하여 데이터를 스트림으로 압축
zlib.createInflate()수축 스트림 압축 풀기

-스트림에는 네 가지 클래스가 있습니다.
Readable: 파이프할 수 있지만 파이프할 수 없는 스트림(데이터를 수신할 수 있지만 데이터를 보낼 수는 없음). 데이터를 읽을 수 있는 스트림으로 푸시하면 소비자가 데이터를 읽기 시작할 때까지 버퍼링됩니다.
Writable: 파이프할 수 있지만 파이프할 수 없는 스트림(데이터를 보낼 수는 있지만 수신할 수 없음)
Duplex: 기본적으로 Readable 및 Writable 스트림의 조합으로 파이프로 연결하고 파이프할 수 있는 스트림
Transform: Transform 스트림은 Duplex와 유사하지만 출력은 입력의 변환입니다.
*/
const Stream = require('stream')

//create readable stream 
const readableStream = new Stream.Readable({
  read() {}
})
//create writable stream 

const writableStream = new Stream.Writable()
console.log("aaaa")
//write 이벤트가 발생했을 때 호출하는 콜백함수 정의
writableStream._write = (chunk, encoding, next) => {
  // 아래 write함수에서 입력된 데이터가 chunk에 저장된다.  
  console.log(chunk.toString())
  //pipe로 연결된 readable 콜백함수가 실행된다.
  next()
  console.log("end")
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')
readableStream.on('readable', () => {
  console.log(readableStream.read())
})

//위의 콜백함 수 호출 부분
writableStream.write('hey!\n')

