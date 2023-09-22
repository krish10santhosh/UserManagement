import * as mongoose from "mongoose";
import express from "express";
import userSchema from './models/userModel.js';

let router = express.Router();

// READ User
router.get("/user/getUserList", async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page;
  await userSchema.find().sort({ createdDate: -1 }).skip((page * limit) - limit).limit(limit).then(async (user, error) => {
    if (error) {
      res.status(404).json("No User Found!");
    } else {
      return res.status(200).json({
        message: "Users Retrieved Successfully",
        toastMessage: "Users Retrieved Successfully",
        data: user,
        page: parseInt(page),
        limit: parseInt(limit),
        total: await userSchema.find().count()
      });
    }
  });
});

// CREATE User
router.post("/user/createUser", async (req, res) => {
  const newUser = new userSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    role: req.body.role,
    createdDate: new Date()
  });
  await newUser.save().then((data, error) => {
    if (error) {
      res.status(404).json("Error!");
    } else {
      return res.status(200).json({ message: "User Created Successfully", data });
    }
  });
});

// UPDATE User
router.post("/user/updateUser/:id", async (req, res) => {
  await userSchema.updateOne(
    { "_id": req.params.id }, {
    $set: req.body,
  }).then((user, error) => {
    if (error) {
      return res.status(404).json("No User Found!");
    } else {
      return res.status(200).json({
        message: "User Updated Successfully",
        toastMessage: "User Updated Successfully",
        data: user,
      });
    }
  });
})

// Delete User
router.delete("/user/deleteUser/:id",
  async (req, res) => {
    await userSchema.findOneAndRemove(
      {
        "_id": req.params.id
      }).then((data, error) => {
        if (error) {
          return res.status(404).json("No User Found!");
        } else {
          res.status(200).json({
            message: "Users Removed Successfully",
            toastMessage: "Users Removed Successfully",
          });
        }
      });
  })

export default router;