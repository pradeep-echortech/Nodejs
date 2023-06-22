const Todo = require("../models/todoModel");

exports.getTodo = async (req, res) => {
  const todo = await Todo.find();
  res.status(200).send(todo);
};

exports.createTodo = async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.status(200).send(newTodo);
};

exports.deleteTodo = async (req,res)=>{
    await Todo.findByIdAndDelete(req.body)
    res.send(null)
}

exports.updateTodo = async (req,res)=>{
   const updated = await Todo.findByIdAndUpdate(req.body._id,req.body,{
    new:true
   })
   res.status(200).send(updated)
}
