const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoController = require("./controller/todoController");
//const bodyParser = require('cors')
const DB =
  "mongodb+srv://pradeep:meherpradeep07@cluster0.rne4wuy.mongodb.net/TodoList?retryWrites=true&w=majority";
// const data = fs.readFileSync("./db.json", "utf-8");

const app = express();
// app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   if (!data) {
//     return res.status(500).send("Server error");
//   }
//   res.status(200).send(JSON.parse(data));
// });

app.get('/',todoController.getTodo)
app.post('/',todoController.createTodo)
app.delete('/',todoController.deleteTodo)
app.patch('/',todoController.updateTodo)

// app.post("/", (req, res) => {
//   fs.readFile("./db.json", "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Server error");
//     }
//     const jsonData = JSON.parse(data);
//     jsonData.push(req.body);

//     const updatedData = JSON.stringify(jsonData);

//     fs.writeFile("./db.json", updatedData, (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send("Server error");
//       }
//       return res.status(200).send("Data stored successfully");
//     });
//   });
//   console.log(req.body);
// });

mongoose.connect(DB).then(() => console.log("Connected to DB"));

app.listen(8081, () => {
  console.log("App running on port no 8081");
});
