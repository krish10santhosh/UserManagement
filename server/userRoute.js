import * as mongoose from "mongoose";
import express from "express";
import userSchema from './models/userModel.js';

let router = express.Router();

// CREATE User
router.post("/user/createUser", async (req, res) => {
  const data = req.body;
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
        data: user,
        page: parseInt(page),
        limit: parseInt(limit),
        total: await userSchema.find().count()
      });
    }
  });
});

// UPDATE User
router
  .route("user/updateUser/:id")
  // Get Single Student
  .get((req, res) => {
    userSchema.findById(
      req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
  })

  // Update User
  .put((req, res, next) => {
    userSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log("Student updated successfully !");
        }
      }
    );
  });

// Delete User
router.delete("user/deleteUser/:id",
  (req, res, next) => {
    userSchema.findByIdAndRemove(
      req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data,
          });
        }
      });
  });

export default router;