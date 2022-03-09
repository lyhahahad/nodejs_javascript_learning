하이라이트
1.node는 싱글스레드 비동기 논블로킹으로 작동하며 이를 통해 많은 i/o 작업을 효율적으로 처리한다. 
이런 장점을 제대로 살리기 위해서는 cpu 작업량이 많은 코드를 스레드풀에 위임할 필요가 있다.
2.이벤트루프가 동기적으로 작동하는 것을 방지해야 한다.<br>
3.libuv는 비동기 작업을 처리해주는 부분이다. os 커널로 넘겨주거나 threadpool을 사용하도록 한다.<br>

node는 I/O관련 작업을 멀티 쓰레드로 처리한다.
OS 커널 혹은 libuc의 쓰레드 풀에서 처리한다.
이벤트 루프가 싱글 스레드이고 블로킹 i/o관련 처리는 백그라운드 멀티 쓰레드로 이루어진다.
i/o관련 작업을 os커널 혹은 libuv 쓰레드 풀에서 처리하기 때문에 이벤트 루프가 blocking되지 않게 한다.
블로킹을 모두 다른 곳으로 넘긴다.<br>

스레드 풀을 사용하는 메서드는 다음과 같다.<br>
I/O-intensive<br>
DNS: dns.lookup(), dns.lookupService().<br>
File System: All file system APIs except fs.FSWatcher() and those that are explicitly synchronous use libuv's threadpool.<br>
CPU-intensive<br>
Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().<br>
Zlib: All zlib APIs except those that are explicitly synchronous use libuv's threadpool.<br>
node의 논블로킹 장점을 제대로 살리기 위해서는 동기적 코드를 스레드풀에 넘길 필요가 있다.
만약 cpu 작업량이 많은 코드를 싱글 스레드인 이벤트 루프에서 실행할 경우 다른 js코드를 블록하게 만들어 다른 작업이 중단된 것처럼 보일 수 있다.
이벤트 루프가 블로킹 되는 것은 반드시 피해야 한다.
cpu작업량이 많은 api를 이벤트 루프에서 사용하지 말아야 한다.<br>
Encryption:
crypto.randomBytes (synchronous version)
crypto.randomFillSync
crypto.pbkdf2Sync 
You should also be careful about providing large input to the encryption and decryption routines.
Compression:
zlib.inflateSync
zlib.deflateSync
File system:
Do not use the synchronous file system APIs. For example, if the file you access is in a distributed file system like NFS, access times can vary widely.
Child process:
child_process.spawnSync
child_process.execSync
child_process.execFileSync
JSON.parse and JSON.stringify <br>
nodejs는 코어 라이브러리 + 바인딩 + v8엔진 + libuv로 이루어져있다.
비동기 처리를 담당하는 부분은 주로 libuv이다.
libuv는 os커널에서 어떤 비동기 작업들을 지원해주는지 알고 있기 때문에 커널을 사용하여 처리할 수 있는 비동기 작업은 thread pool에서 처리하도록 한다.
node의 대부분의 코드는 콜백함수로 이루어져있기 때문에 libuv내에 위피한 이벤트 루프에서 관리 및 처리된다.
이벤트 루프는 여러개의 페이즈들을 갖고 있으며 각자만의 큐를 갖는다.<br>

nodejs의 특성 정리 : 이벤트 기반, 논블로킹 i/o, 싱글스레드<br>
이벤트 기반 : 이벤트 큐에 항상 명령을 대기시키지 않고 이벤트 리스너를 통해 이벤트가 발생하면 콜백함수를 실행한다.
이벤트에 따라 호출되는 콜백함수를 관리하는 것이 이벤트 루프이다.
<br>
논블로킹 : api 호출 결과를 기다리지 않고 다음 코드를 실행한다. 
nodejs가 논블로킹인 이유는 싱글 스레드이기 때문이다. 블록킹이라면 cpu를 멈추고 기다리는 경우가 많아져 비효율을 초래할 것이다.
i/o와 관련된 작업 등을 백그라운드, os커널 혹은 libuv의 threadpool에서 수행하고 이를 비동기 콜백 함수로 이벤트 루프에 전달한다.
<br>
https://darrengwon.tistory.com/953
