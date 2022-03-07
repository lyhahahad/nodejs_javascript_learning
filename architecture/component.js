/**
 * Requests : 
 * node server : 
 * event queue : 클라이언트의 요청을 저장하고 이벤트 루프에 순차적으로 전달한다.
 * thread pool : nodejs 서버의 스레드 풀에는 요청을 처리하는 데 필요한 작업을 수행하는 데 사용할 수 있는 스레드가 포함되어 있다.
 * event loop : 이벤트큐에서 요청을 수신하고 클라이언트에 응답을 보낸다.
 * external resources : 
 */

/**
 * Thread Pool
 * os가 메모리 공간을 확보해주고 메모리를 스레드에 할당해준다.
 * 요청이 들어올 때 마다 스레드를 생성하고 일을 다하면 수거하는 작업은 프로그램 포퍼먼스에 영향을 준ㄷ나.
 * 때문에 스레드를 미리 만들어 놓는 것이다.
 * 스레드 풀을 사용하는 모듈에는 crypto, zlib, dns.lockup 등이 있다.
 */

 const crypto = require('crypto');

 const pass = 'pass';
 const salt = 'salt';
 const start = Date.now();
 
 crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
     console.log('1:', Date.now() - start);
 });
 crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
     console.log('2:', Date.now() - start);
 });
 crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
     console.log('3:', Date.now() - start);
 });

/**
 * 위의 코드는 1,2,3 순서대로 실행되지 않을 수 있다.
 * 스레드 풀이 작업을 동시에 처리하기 때문에 3개의 작업 중에서 어느 것이 먼저 처리될지 모른다.
 * 컴퓨터 코어 숫자에 따라 결과가 달라질 수 있다.
 * cmd에서 스레드 풀의 사이즈를 1개로 지정하면 하나씩 처리된다.
 */