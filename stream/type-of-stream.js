/*
*Types of streams
-Writable: 데이터를 쓸 수 있는 스트림(예: fs.createWriteStream()).
HTTP requests, on the client 클라이언트에서 http 요청
HTTP responses, on the server 서버에서 http응답
fs write streams
zlib streams
crypto streams
TCP sockets
child process stdin
process.stdout, process.stderr

-Readable: 데이터를 읽을 수 있는 스트림(예: fs.createReadStream()).
HTTP responses, on the client 클라이언트에서 http응답
HTTP requests, on the server 서버에서 http요청
fs read streams
zlib streams
crypto streams
TCP sockets
child process stdout and stderr
process.stdin

-Duplex : 읽을 수 있고 쓸 수 있는 스트림 net.Socket.
CP sockets
zlib streams
crypto streams

-Transform: 데이터를 쓰고 읽을 때 수정하거나 변환할 수 있는 이중 스트림(zlib.createDeflate())
ib streams
crypto streams

*utility funtion
-stream.pipeline()
-stream.finished()
-stream.Readable.from()
-stream.addAbortSignal()

*Streams Promises API
stream/promises API는 콜백을 사용하는 대신 Promise 객체를 반환하는 스트림에 대한 대체 비동기 유틸리티 함수 세트를 제공합니다.
*/