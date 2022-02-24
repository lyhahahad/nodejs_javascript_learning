//아래 코드의 출력 순서는?

console.log("1111")

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
},251)

console.log("2222")

function a(){
  console.log("process.nextTick()")
}
process.nextTick(a)
/*
settimeout 250, 249로 설정했을 때
mainline 코드 : 
1111
2222
->
microtasks 코드 : 
process.nextTick()
->
timers: 
setTimeout!
->
microtasks 코드 : 
setTimeout_promise
myFirstPromise
*/

/*
settimeout 250, 250로 설정했을 때
mainline 코드 : 
1111
2222
->
microtasks 코드 : 
process.nextTick()
---아래 순서는 프로세스 순서에 따라 바뀔 수 있다.--- (x)
->
timers: 
setTimeout!
->
microtasks 코드 : 
setTimeout_promise
myFirstPromise

정답 : 
setTimeout_promise
myFirstPromise
setTimeout!순서대로 실행됨.

250, 251로 했을 때도 같은 답이 나온다.
애매한 부분은 promise안에 있는 settimeout이 어떻게 작동하는가이다.
이부분 확실하게 하기.
promise가 microtasks에서 작동하는지도 확실하게 하기.
*/