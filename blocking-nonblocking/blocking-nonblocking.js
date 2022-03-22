/**
 * blocking 작동 방식은 nodejs 프로세스에서 추가 js실행이 js가 아닌 작업이 완료될 때까지 기다려야 하는 경우입니다.
 * .libuv를 사용하는 nodejs 표준 라이브러리의 동기 메서드는 일반적으로 blocking 방식으로 동작한다.
 * nodejs의 표준 라이브러리의 모든 i/o모듈은 비동기 버전으로 제공되며 non-blocking 방식으로 동작한다.
 * 동기버전에서는 오류가 발생하면 잡아야 하며 그렇지 않으면 프로세스가 중단됩니다.
 * 비동기 버전에서는 오류가 표시된 대로 발행해야 하는지 여부를 결정하는 것은 작성자의 몫입니다.
 * nodejs에서 js실행은 단이 스레드이므로 동시성은 다른 작업을 완료한 후 js 콜백함수를 실행할 수 있는 이벤트 루프의 용량을 나타낸다.
 * 동시 실행이 예상되는 모든 코드는 i/o와 같은 비js 작업이 발생하는 동안 이벤트 루프가 계속 실행되도록 허용해야 한다.
 * 
 */

const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read

const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});

const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log

const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log