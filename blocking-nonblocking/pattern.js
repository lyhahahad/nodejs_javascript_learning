/**
 * 피해야 하는 몇가지 패턴이 존재한다.
 * 대표적인 것이 blocking코드와 non-blocking코드의 혼합문제이다.
 * 첫 번째 예시는 file을 읽어오기 전에 파일이 삭제될 수 있다.
 * 두 번째 예시는 file을 읽어오고 난 후에 파일을 삭제하도록 하는 코드이다.
 * 첫 번째와 같이 혼합으로 쓰는 것은 피하는 것이 좋다.
 */

 const fs = require('fs');
 fs.readFile('/file.md', (err, data) => {
   if (err) throw err;
   console.log(data);
 });
 fs.unlinkSync('/file.md');

 const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});