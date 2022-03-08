/**
 * https://stackoverflow.com/questions/63369876/nodejs-what-is-maximum-thread-that-can-run-same-time-as-thread-pool-size-is-fo
 * https://psyhm.tistory.com/45
 * https://darrengwon.tistory.com/953(Node 구성 요소~~)
 * nodejs는 네트워크 i/o작업을 기본 스레드에서 실행한다.
 * 기본 스레드 이외에 4개의 스레드를 생성한다.
 * 각각은 dns resolver, file system api, crypto, zlib
 */

/**
 * 하이라이트
 * 1.node는 비동기 논블로킹으로 작동하며 이를 통해 많은 i/o 작업을 효율적으로 처리한다. 
 * 이런 장점을 제대로 살리기 위해서는 cpu 작업량이 많은 코드를 스레드풀에 위임할 필요가 있다.
 * 2.이벤트루프가 동기적으로 작동하는 것을 방지해야 한다.
 * 3.libuv는 비동기 작업을 처리해주는 부분이다. os 커널로 넘겨주거나 threadpool을 사용하도록 한다.
 * 4.
 * 5.
 * 
 * node는 I/O관련 작업을 멀티 쓰레드로 처리한다.
 * OS 커널 혹은 libuc의 쓰레드 풀에서 처리한다.
 * 이벤트 루프가 싱글 스레드이고 블로킹 i/o관련 처리는 백그라운드 멀티 쓰레드로 이루어진다.
 * i/o관련 작업을 os커널 혹은 libuv 쓰레드 풀에서 처리하기 때문에 이벤트 루프가 blocking되지 않게 한다.
 * 블로킹을 모두 다른 곳으로 넘긴다.
 * 
 * 스레드 풀을 사용하는 메서드는 다음과 같다.
 * I/O-intensive
 * DNS: dns.lookup(), dns.lookupService().
 * File System: All file system APIs except fs.FSWatcher() and those that are explicitly synchronous use libuv's threadpool.
 * CPU-intensive
 * Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().
 * Zlib: All zlib APIs except those that are explicitly synchronous use libuv's threadpool.
 * node의 논블로킹 장점을 제대로 살리기 위해서는 동기적 코드를 스레드풀에 넘길 필요가 있다.
 * 만약 cpu 작업량이 많은 코드를 싱글 스레드인 이벤트 루프에서 실행할 경우 다른 js코드를 블록하게 만들어 다른 작업이 중단된 것처럼 보일 수 있다.
 * 이벤트 루프가 블로킹 되는 것은 반드시 피해야 한다.
 * cpu작업량이 많은 api를 이벤트 루프에서 사용하지 말아야 한다.
 * Encryption:
 * crypto.randomBytes (synchronous version)
 * crypto.randomFillSync
 * crypto.pbkdf2Sync 
 * You should also be careful about providing large input to the encryption and decryption routines.
 * Compression:
 * zlib.inflateSync
 * zlib.deflateSync
 * File system:
 * Do not use the synchronous file system APIs. For example, if the file you access is in a distributed file system like NFS, access times can vary widely.
 * Child process:
 * child_process.spawnSync
 * child_process.execSync
 * child_process.execFileSync
 * JSON.parse and JSON.stringify 
 * nodejs는 코어 라이브러리 + 바인딩 + v8엔진 + libuv로 이루어져있다.
 * 비동기 처리를 담당하는 부분은 주로 libuv이다.
 * libuv는 os커널에서 어떤 비동기 작업들을 지원해주는지 알고 있기 때문에 커널을 사용하여 처리할 수 있는 비동기 작업은 thread pool에서 처리하도록 한다.
 * 
 * 
 * 
 * 
 */