/**
 * window11 cmd에서 프로세스 확인법
 * 전체 프로세스 체크
 * (Get-Process).Count
 * 전체 스레드 체크
 * (Get-Process|Select-Object -ExpandProperty Threads).Count
 * 
 * node 프로세스, 스레드 체크
 * Get-Process node | measure
 * (Get-Process node | Select-Object -ExpandProperty Threads).count
 */

const http = require('http')
const port = 3000;
const requestHandler = (req, res)=>{
    console.log(req.url)
    res.end("hello nodejs")
}
const server = http.createServer(requestHandler)

server.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }
    console.log(port)
})