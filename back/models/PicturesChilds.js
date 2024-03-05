const {Schema, model} = require('mongoose')

const taskSchema = new Schema({    
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    }
})

module.exports = model("Task", taskSchema)