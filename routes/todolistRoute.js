const express = require("express");
const { TodolistModel } = require("../models/todolistModel");

const todolistRouter = express.Router();

todolistRouter.post("/", async (req, res) => {
  const { todoName } = req.body;
  const authorId = req.authorId

  try {
    await TodolistModel.create({ authorId, todoName });
    return res.status(201).json({ message: "task added sucessfully" });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

todolistRouter.get("/", async (req, res) => {
  const authorId  = req.authorId;
    console.log(authorId,"author")
  try {
    let todolistData = await TodolistModel.find({ authorId });
    return res.status(200).json({ message: todolistData });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});



module.exports ={todolistRouter}
