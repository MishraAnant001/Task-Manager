import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide a name!"],
        trim:true,
        maxlength:[20,"name should not exceed 20 characters"]
    },description:{
        type:String,
        default:""
    },completed:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('mytasks',taskSchema);