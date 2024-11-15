const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const dataSchematop1=new Schema({
    image:{
        data: Buffer, // Stores image data as a binary buffer
        contentType: String // Stores the MIME type of the image, e.g., "image/png" or "image/jpeg"
      
    },
    head:{
        type:String,
        required:true
    },
    textbody:{
        type:String,
        required:true
    },
    createdatetime:{
        type:String,
        default:Date.now
    }
})
const dataModeltop2=mongoose.model("datatop1",dataSchematop1);
module.exports=dataModeltop2;