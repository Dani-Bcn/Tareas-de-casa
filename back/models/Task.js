const {Schema, model} = require('mongoose')

const taskSchema = new Schema({    
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    points:{
        type:Number,
        rquired:true
    }
})

module.exports = model("Task", taskSchema)