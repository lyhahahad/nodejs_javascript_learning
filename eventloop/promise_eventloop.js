console.log("mainline")

let myFirstPromise = new Promise((resolve, reject) => {
    setTimeout( function() {
      console.log("setTimeout_promise")
      resolve("myFirstPromise")
    }, 250)
  })
  
  myFirstPromise.then((result) => {
    console.log(result)
  });

setTimeout( function() {
    console.log("setTimeout!")  // 와! 문제 없음!
},249)

console.log("mainline")
// nodejs eventloop
// mainline ->microtasks -> timers ->microtasks -> poll ->microtasks -> check ->microtasks -> timers ... 이런 순서대로 돈다.
// 1.mainline에 해당하는 부분인 console.log("mainline").
// setTimeout_promise
// myFirstPromise
// setTimeout!
// or
// setTimeout!
// setTimeout_promise
// myFirstPromise
// 두가지 결과가 모두 나옴 다만 
// setTimeout_promise
// myFirstPromise
// 이 순서는 보장됨.
// 그 이유는 모든 phase 이후에 가장 먼저 실행되는 것이 mircotask이기 때문이다.
// 여러개의 promise.then이 있다면??
// https://javascript.info/microtask-queue
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
// 이런 결과 나오는 이유 직접 생각해보기.