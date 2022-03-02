/**
https://nodejs.dev/learn/nodejs-streams
https://nodejs.dev/learn/the-nodejs-event-emitter
stream은 노드js에서 스트리밍 데이터 작업을 위한 추상 인터페이스이다.
파일 읽기/쓰기, 네트워크 통신 또는 모든 종류의 종단 간 정보 교환을 효율적인 방식으로 처리하는 방법입니다.
모든 stream은 event emitter의 인스턴스이다.
even emitter은 

코드 구조.
mainline에 read, write 스트림을 만들고 이벤트 리스너를 호출한다.
이벤트 리스너는 
readable의 경우
파일이 열릴 때 발생하는 이벤트를 관리하는 open
데이터를 읽을 때 발생하는 이벤트를 관리하는 data
에러가 발생할 때 관리하는 error
연결을 닫을 때 발생하는 close
writeable은 data 대신 pipe 이벤트를관리한다. pipe는 스트림에서 메서드가 호출될 때마다 발생한다.
 */
(function mainline() {
    // Create the ReadableStream
    const readableStream = fs.createReadStream(appSettings.inputFileName, 'utf8');
    // Register event listeners for the input file
    registerReadableStreamEventListeners(readableStream);
    // The output file (WritableStream)
    const writableStream = fs.createWriteStream(appSettings.outputFileName, 'utf8');
    // Register event listeners for the output file
    registerWritableStreamEventListeners(writableStream, readableStream);
})();

function registerReadableStreamEventListeners(readableStream) {
    readableStream.on('open', (fd) => {
        logger.info('open event received, file descriptor: ' + fd, 'ReadableStream.on(open).callback');
    });
    readableStream.on('data', (chunk) => {
        logger.info('data event received: chunk size: ' + chunk.length, 'ReadableStream.on(data).callback');
    });
    readableStream.on('error', (err) => {
        logger.info('Something has gone horribly wrong: ' + err.message, 'ReadableStream.on(error).callback');
    });
    readableStream.on('close', () => {
        logger.info('close event received', 'ReadableStream.on(close).callback');
    });
}

function registerWritableStreamEventListeners(writableStream, readableStream) {
    writableStream.on('open', (fd) => {
        logger.info('open event received, file descriptor: ' + fd, 'WritableStream.on(open).callback');
        // Connect the readableStream to the writableStream
        readableStream.pipe(writableStream);
    });
    writableStream.on('pipe', (src) => {
        logger.info('pipe event received, let the data flow!', 'WritableStream.on(pipe).callback');
    });
    writableStream.on('error', (err) => {
        logger.info('Something has gone horribly wrong: ' + err.message, 'WritableStream.on(error).callback');
    });
    writableStream.on('close', () => {
        logger.info('close event received', 'WritableStream.on(close).callback');
    });
}

mainline();

/**
실행 결과
527160650.291643: ReadableStream.on(open).callback:[INFO]: open event received, file descriptor: 13
527160650.956652: WritableStream.on(open).callback:[INFO]: open event received, file descriptor: 14
527160651.230392: WritableStream.on(pipe).callback:[INFO]: pipe event received, let the data flow!
527160651.686702: ReadableStream.on(data).callback:[INFO]: data event received: chunk size: 65536
527160653.008806: ReadableStream.on(data).callback:[INFO]: data event received: chunk size: 3009
527160654.401119: ReadableStream.on(close).callback:[INFO]: close event received
527160654.459593: WritableStream.on(close).callback:[INFO]: close event received
각각의 이벤트가 발생했을 때 출력이 발생한다.
non blocking 비동기적으로 이루어진다.
+a
node는 스트림, Promise.resolve().then(), process.nextTick() 등을 사용해 다양한 방식으로 코드를 처리할 수 있다.
 */
/**
stream을 사용하는 대표적인 예제는 http 서버를 구축하는 것이다. 
data 
*/
const http = require('http');

const server = http.createServer((req, res) => {
  // `req` is an http.IncomingMessage, which is a readable stream.
  // `res` is an http.ServerResponse, which is a writable stream.

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added.
  req.on('data', (chunk) => {
    body += chunk;
  });

  // The 'end' event indicates that the entire body has been received.
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // Write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh! bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);