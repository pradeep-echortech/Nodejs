const fs = require('fs')
const http = require('http')

// blocking
// const textIn = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn)
// const textOut = `This text is added : ${textIn}`
// fs.writeFileSync('./txt/output.txt',textOut)

// non-blocking
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2)
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3)
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',(err)=>{
//                 console.log(err)
//             })
//         })
//     })
// })

//Server
const server = http.createServer((req,res)=>{
    const pathName = req.url
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is an Overview Page')
    }else if(pathName === '/product') {
        res.end('This is a Product Page')
    }else{
        res.writeHead(404,{
            'content-type':'text/html'
        })
        res.end('<h1>Page not found !</h1>')
    }
})

server.listen(8000,()=>{
    console.log('Listening to the requests on port 8000')
})