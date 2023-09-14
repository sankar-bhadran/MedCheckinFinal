import mongoose from "mongoose";

const testSchema=new mongoose.Schema({
    Lab:{
        type:mongoose.Types.ObjectId,
        ref:"centerdetail"
    },
    
    mainCategory:{
        type:String,
        required:true
    },

    subCategory:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    }
})

export default mongoose.model('testModel',testSchema)