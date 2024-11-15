const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:false,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isemailed:{
        type:Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ['admin', 'employee', 'user'], // Define roles
        default: 'user', // Default role
      },
})
const userModel=mongoose.model('user',userSchema);
module.exports=userModel;