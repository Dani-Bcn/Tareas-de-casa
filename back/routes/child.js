const router = require("express").Router();
const Child = require("../models/Child")
const Task = require("../models/Task")
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require('../middlewares/jwt');
const date = new Date()
const day = date.getDay()
// const hour = date.getHours()
// console.log(hour, day)

// @desc   Create new child
// @route   POST /api/v1/child
// @access  Public
router.post("/", isAuthenticated, async (req,res,next)=>{
    // console.log('Creating:', req.payload)
    const {name, yearOfBirth, imageUrl, tasks, points, pointsCup, cups, goalTasks, taskDone} = req.body 
        try{
            const child = await Child.create({name, yearOfBirth, imageUrl ,tasks, points,  cups, pointsCup, goalTasks, taskDone, user: req.payload._id })
            res.status(201).json({ data:child });
        }catch(error){
           console.log(error)
    }
})
// @desc   Find all child
// @route   GET /api/v1/child
// @access  Public
router.get("/", async (req,res,next)=>{
    try{
        const child = await Child.find({})         
        res.status(201).json({ data:child}); 
        // console.log(child)
    }catch(error){
            next(error)
    }
})
// @desc   Find all child
// @route   GET /api/v1/child/mine
// @access  Public
router.get("/mine", isAuthenticated, async (req,res,next)=>{
    // console.log('Getting children:', req.payload);
    try{
        const child = await Child.find({ user: req.payload._id })     
        res.status(201).json({ data:child}); 
    }catch(error){
        next(error)
    }
})
// @desc   Find one child
// @route   GET/api/v1/child/:id
// @access  Public
    router.get("/:id", async (req,res,next)=>{
        const { id } = req.params
        try{
            const child = await Child.findById(id).populate("tasks");
            res.status(201).json({ data:child });          
        }catch(error){
            next(error)  
        }
    })
// @desc   Delete  child
// @route   DELETE /api/v1/child/:id
// @access  Public
    router.delete("/:id", async (req,res,next)=>{
        const { id } = req.params
        try{
            const child = await Child.findByIdAndDelete(id)
            res.status(201).json({ data:child }); 
        }catch(error){
            next(error)
        }
    })
// @desc   Edit child
// @route   put /api/v1/child/:id
// @access  Public
    router.put('/:id', async (req, res, next) => {
        const {id} =req.params
        const { name, yearOfBirth, imageUrl, tasks, points, pointsCup, goalTasks, taskDone }= req.body         
        try {              
          const updateChild = await Child.findByIdAndUpdate(id, req.body,{new:true});
          res.status(202).json({ data: updateChild })
        } catch (error) {
          next(error);
        }       
    });
// @desc   Add task child
// @route   PUT /api/v1/child
// @access  Public  
router.put('/addTask/:childId/:taskId', async (req, res, next) => {
    const { childId, taskId } = req.params;
    try {
        const child = await Child.findById(childId);    
        child.goalTasks = child.goalTasks + 1;  
        // console.log(child.goalTasks * child.taskDone / 100)   
        child.tasks.push(taskId);
        // console.log(child)
        child.save();
        res.status(202).json({ data: child })
    } catch (error) {
        next(error);
    } 
});
// @desc    Delete task child
// @route   PUT /api/v1/child
// @access  Public  
router.put('/deleteTask/:childId/:taskId', async (req, res, next) => {  
    const { childId, taskId} = req.params;      
    try { 
        const child= await Child.findById(childId)
        child.goalTasks = child.goalTasks - 1;             
        child.tasks.pull(taskId);   
        child.save();          
        res.status(201).json({ data:child});    
    } catch (error) {
      next(error);
   }
});
// @desc    Add points chils (Tasks done)
// @route   PUT /api/v1/child
// @access  Public  
router.put('/addPoints/:childId/:taskId', async (req, res, next) => {  
    const { childId, taskId} = req.params;         
    try { 
        const task = await Task.findById(taskId) 
        // console.log(task.points)
        const child = await Child.findById(childId) 
        child.tasks.pull(taskId);
        child.taskDone = child.taskDone + 1
        child.points = child.points + task.points;          
        child.pointsCup = child.pointsCup + task.points; 
        console.log(child.taskDone / child.goalTasks *100)  
        if(child.pointsCup > 1000 ){
            child.cups =1
        }
        if(child.pointsCup > 2000 ){
            child.cups =2
        }        
        if(child.pointsCup > 3000 ){
            child.cups =3
        }
        if(child.pointsCup > 4000 ){
            child.cups =4
        }  
        child.save();           
        res.status(201).json({ data:child});  
        //  if (child.pointsCup < 150){
        //     child.cups = child.cups + task.points;   
        // }        
    } catch (error) {
      next(error);
   } 
});
// @desc    Reset points chils 
// @route   PUT /api/v1/child
// @access  Public 
router.put('/resetPoints/:childId', async (req, res, next) => {  
    const { childId} = req.params;        
    try {       
        const child= await Child.findById(childId)        
        child.points = 0; 
        child.goalTasks = 0 
        child.taskDone = 0      
        child.save();          
        res.status(201).json({ data:child});    
    } catch (error) {
      next(error);
   }
});
router.put('/resetCups/:childId', async (req, res, next) => {  
    const { childId} = req.params;        
    try {       
        const child= await Child.findById(childId)        
        child.cups = 0;          
        child.pointsCup = 0 
        child.tasks = []
        child.save();          
        res.status(201).json({ data:child});    
    } catch (error) {
      next(error);
   }
});
// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/child/upload
// @access  Private
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => { 
    if (!req.file) {      
      next(new ErrorResponse('Error uploading the image', 500));
      return;
    }
    res.json({ fileUrl: req.file.path });
  });    
   //@desc    Create a image child
   //@route   POST /api/v1/
   //@access  Public
router.post('/', async (req, res, next) => {
   const { title, yearOfBirth, imageUrl, tasks, points, cups, pointsCup, goalTasks, taskDone} = req.body;
   try {
        const imgChild = await Child.create({ title, yearOfBirth, imageUrl, tasks, points,  cups, pointsCup, goalTasks, taskDone });
        if (!imgChild) {
            next(new ErrorResponse('An error ocurred while creating the project', 500));
        return;
      }
       res.status(201).json({ data: imgChild })
    } catch (error) {
      next(error);   
    }
   })
module.exports = router;