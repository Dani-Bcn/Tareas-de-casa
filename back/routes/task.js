const router = require("express").Router()
const Task =require("../models/Task")
// @desc   Create new task
// @route   POST /api/v1/task
// @access  Public
router.post("/", async (req,res,next)=>{
    const {name, imageUrl, points} = req.body
        try{
            const task = await Task.create( {name, imageUrl, points})
            res.status(201).json({ data:task});
        }catch(error){
            console.log(error)
        }
    })
// @desc   Find all tasks
// @route   GET/api/v1/task
// @access  Public
    router.get("/", async (req,res,next)=>{    
        try{    
            const task = await Task.find({})
            res.status(201).json({ data:task});    
        }catch(error){
            next(error)
        }        
    })
// @desc   Find one task
// @route   GET/api/v1/task
// @access  Public
    router.get("/:id", async (req,res,next)=>{
        const { id } = req.params
            try{    
                const task = await Task.findById(id)
                res.status(201).json({ data:task});    
            }catch(error){
               next(error)
            }        
    })
// @desc   Delete task
// @route   DELETE /api/v1/task
// @access  Public
    router.delete("/:id", async (req,res,next)=>{
        const { id } = req.params
            try{    
                const task = await Task.findByIdAndDelete(id)
                res.status(201).json({ data:task});    
            }catch(error){
                next(error)
            }        
    })
// @desc  Edit  task
// @route   PUT /api/v1/task
// @access  Public
    router.put('/:id', async (req, res, next) => {
        const { id } = req.params
        const { name, points}= req.body      
        try {     
          const updateTask = await Task.findByIdAndUpdate(id, req.body,{new:true});
          res.status(202).json({ data: updateTask })
        } catch (error) {
          next(error);
        }       
      });
module.exports = router;