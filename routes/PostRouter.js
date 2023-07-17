const PostModel = require("../models/postModel");
const express = require("express");
const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

PostRouter.get("/post", async (req, res) => {
  try {
    const post = await PostModel.find(req.query);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

PostRouter.post("/addPost", async (req, res) => {
  const payload = req.body;
  try {
    const post = await PostModel.create({ ...payload, creator: req.userId });
    return res.status(200).send({ msg: "new post has been added", post });
  } catch (error) {
    res.status(500).send({ msg: "Unable to post" });
  }
});

PostRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (req.body.userId === post.userId) {
      const updatedPost = await PostModel.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
      );
      res.status(200).send({ msg: "post has been updated", updatedPost });
    } else {
      res.status(400).send({ msg: "unable to update" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Unable to update", error: error.message });
  }
});

PostRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  try {
    if (req.body.userId === post.userId) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "post has been deleted" });
    } else {
      res.status(400).send({ msg: "unable to delete" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Unable to delete" });
  }
});

module.exports = PostRouter;
