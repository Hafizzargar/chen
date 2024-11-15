const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const useradmin= new Schema({
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
    role: {
        type: String,
        default: 'admin', // Default role
      },
});
const adminmodel=mongoose.model('admin',useradmin);
module.exports=adminmodel;