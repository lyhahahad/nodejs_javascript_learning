function A(){
    console.log("process.nextTick")
}
console.log("mainline_1")
setTimeout(() => {
    console.log("settimeout")
}, 0);

process.nextTick(()=>{
    A()
    process.nextTick(()=>{
        A()
    })
})

console.log("mainline_2")

console.log("mainline_3")
/**
 * mainline_1
 * mainline_2
 * mainline_3
 * process.nextTick()
 * process.nextTick()
 * settimeout
 * process.nextTick() 콜백함수는 이벤트 루프의 다른 콜백들보다 항상 먼저 실행되기 때문에 재귀로 구현하게 되면 blocking이 발생할 수 있다.
 */