function timeoutPromise(interval) {
    return new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("done");
    }, interval);
    });
};

//timeoutPromise가 각각 실행될 때 모두 기다린다.
//즉9초를 기다린 후에 .then이후의 코드가 실행된다.
//때문에 느리다.
async function timeTest_1() {
    await timeoutPromise(3000);
    await timeoutPromise(3000);
    await timeoutPromise(3000);
}


let startTime = Date.now();
timeTest_1()
.then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    console.log("timeTest_1 Time taken in milliseconds: " + timeTaken);
})


//변수에 저장하면서 timeoutPromise가 모두 non-blocking으로 실행된다.
//때문에 훨씬 빠르다.
async function timeTest_2() {
    const timeoutPromise1 = timeoutPromise(3000);
    const timeoutPromise2 = timeoutPromise(3000);
    const timeoutPromise3 = timeoutPromise(3000);

    await timeoutPromise1;
    await timeoutPromise2;
    await timeoutPromise3;
}

timeTest_2()
    .then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    console.log("timeTest_2 Time taken in milliseconds: " + timeTaken);
    })

// timeTest_2 Time taken in milliseconds: 3013
// timeTest_1 Time taken in milliseconds: 9023