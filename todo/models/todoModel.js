const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true , 'Insert a Task']
    },
    editing:Boolean,
    checked:Boolean,
})

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo