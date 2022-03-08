const fs = require('fs'); //1

function someAsyncOperation(callback) {
  // 이 작업이 완료되는데 95ms가 걸린다고 가정합니다.
  fs.readFile('./aa.txt', callback); //5
}

const timeoutScheduled = Date.now(); //2

setTimeout(() => { //3
  const delay = Date.now() - timeoutScheduled; //6 or 7

  console.log(`${delay}ms have passed since I was scheduled`);
}, 5);

// 완료하는데 95ms가 걸리는 someAsyncOperation를 실행합니다.
someAsyncOperation(() => { //4
    const startCallback = Date.now(); //6 or 7
    console.log("pollphase")
    // 10ms가 걸릴 어떤 작업을 합니다.
    while (Date.now() - startCallback < 10) {
        console.log("+")
  }
});


/**
 * 메인라인 실행
 * 타이머 실행
 * poll phase로 넘어가 해당 i/o실행 스케쥴링된 타이머가 있기 때문에 check로 넘어감
 * 다시 돌아왔을 때 타이머가 만료됐다면 실행 아니라면 뒤에 실행.
 * 파일을 읽어오는 시간이 타이머 만료보다 빠르다면 settimeout 코드가 먼저 실행된다.
 * 아니라면 좀더 시간이 걸린 후에 실행된다.
 * 위의 경우에는 파일을 읽어오는데 시간이 크게 오래걸리지 않기 때문에 settimeout이 뒤에 실행될 가능성이 높다.
 * 
 * setimeout이 처음 실행됐을 때 local var에 timeoutScheduled 변수가 추가된다.
 * fs.readfile이 처음 실행되면 callback 함수가 local에 들어간다.
 * 타이머가 만료되면 timeout내의 함수가 실행된다.
 * 타이머 시간에 따라 위의 결과는 달라진다. ㄴ
*/