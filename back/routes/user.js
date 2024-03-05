const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');
const User = require('../models/User');
// const ErrorResponse = require('../utils/error');
// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    GET one user
// @route   GET /api/v1/auth/:id
// @access  Public
router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
      const findUser = await User.findById(id)
      res.status(201).json({ data: findUser });
    } catch (error) {
      next(error)
    }
  });
// @desc    GET all user
// @route   GET /api/v1/auth/
// @access  Public
router.get("/", async (req, res, next) => {
    try {
      const findUser = await User.find({})
      res.status(201).json({ data: findUser });
    } catch (error) {
      next(error)
    }
  });  
  // @desc    Edit user
  // @route   POST /api/v1/auth/edit
  // @access  Private
  router.put('/edit', isAuthenticated, async (req, res, next) => {
    const { username } = req.body;
    const { _id } = req.payload._id
    try {
      // Add validations in the future
      const editedUser = User.findByIdAndUpdate(_id, { username }, { new: true });
      res.status(201).json({ data: editedUser });
    } catch (error) {
      console.error(error);
    }
  });
  // @desc    POST delete user
  // @route   GET /api/v1/auth/delete/:id
  // @access  Private
  router.delete("/:id", async (req,res,next)=>{
    const { id }= req.params
    try{
        const  deleteUser = await User.findByIdAndDelete(id)
        res.status(201).json({ data:deleteUser }); 
    }catch(error){
      next(error)
    }
  })    