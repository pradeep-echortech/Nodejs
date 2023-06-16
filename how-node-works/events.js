const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

let myEmitter = new Sales

myEmitter.on('newSale',()=>{
    console.log('There is a new Sale !')
})

myEmitter.on('newSale',stock =>{
    console.log(`There are ${stock} items left in stock`)
})

myEmitter.emit('newSale',9)

/////////////////////////////

const server = http.createServer();

server.on('request',(req,res)=>{
    console.log('Request Received')
    res.end('Request Received')
})

server.on('request',(req,res)=>{
    console.log('Another Request Received')
})

server.on('close',()=>{
    console.log('Server closed')
})

server.listen(5000,()=>{
    console.log('waiting for the requests')
})