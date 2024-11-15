const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const dataSchema=new Schema({
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
const dataModel=mongoose.model("data",dataSchema);
module.exports=dataModel;