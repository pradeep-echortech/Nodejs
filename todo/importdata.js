const fs = require("fs");
const mongoose = require("mongoose");
const Todo = require("./models/todoModel");

const DB =
  "mongodb+srv://pradeep:meherpradeep07@cluster0.rne4wuy.mongodb.net/TodoList?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => console.log("DBs connection successful"));

// Read JSON file
const todos = JSON.parse(fs.readFileSync(`${__dirname}/db.json`, "utf-8"));

// Import Data from DB
const importData = async () => {
  try {
    await Todo.create(todos);
    console.log("Data successfully Loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
importData();

// Delete Data from DB
const deleteData = async () => {
  try {
    await Todo.deleteMany();
    console.log("Data successfully Deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
