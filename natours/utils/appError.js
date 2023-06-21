class AppError extends Error {
    constructor(message,statusCode,name){
        super(message)
        this.name= name
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4')?'fail':'error'
        this.isOpertaional= true

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = AppError