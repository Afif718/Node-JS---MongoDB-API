const dbConnection = require("./dbConnection");
//the mongoDB will be used to get the ObjectId instance
const mongoDB = require("mongodb");
const express = require("express");
const app = express();

//to get jscon data
app.use(express.json());

//this is the get api
app.get("/", async (req, res) => {
  let result = await dbConnection();
  let data = await result.find({}).toArray();

  res.send(data);
});

//this is used to insert/add data inside the data
app.post("/", async (req, res) => {
  console.log(req.body);

  let data = await dbConnection();
  let sendData = await data.insertOne(req.body);
  res.status(201).send("Data inserted successfully");
});

//this is used to update data
app.put("/:name", async (req, res) => {
  console.log(req.body);
  let data = await dbConnection();
  let result = await data.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );

  res.status(201).send("Data updated successfully");
});

app.delete("/:id", async (req, res) => {
  console.log(req.params.id);

  let data = await dbConnection();
  let delData = await data.deleteOne({
    _id: new mongoDB.ObjectId(req.params.id),
  });

  res.send(delData);
});

app.listen(4500, () => console.log("Server running"));
