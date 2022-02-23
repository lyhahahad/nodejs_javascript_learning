//아래 코드의 출력 순서는?

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

/*

*/