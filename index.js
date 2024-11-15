const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');//nodemailer
const multer = require('multer');//multer
const path=require('path');
const dataModel = require('./Model/datamodel.js');
const userModel=require('./Model/userModel.js');
const adminmodel=require('./Model/admin.js')
const {isAuth,employeeadmin}=require('./utils/isAuth.js')
require("dotenv").config();
const app=express();
const MONO_URI=process.env.MONO_URI;
mongoose.connect(MONO_URI)
.then(()=>console.log("connection created successfully")
).catch((err)=>console.log("connection not created")
)
const session=require('express-session');
const dataModeltop2 = require('./Model/data1.js');
const { log } = require('console');
const mongodbsession=require("connect-mongodb-session")(session);

const store=new mongodbsession({
    uri:process.env.MONO_URI,
    collection:'sessions'
})

app.use(session({
    secret:process.env.jwtkey,
    store:store,
    resave:false,
    saveUninitialized:false
}))

const storage = multer.memoryStorage();   //multer
const upload = multer({ storage: storage });




app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));  //to aceess ejs dom can be usedijn browser js
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    return res.render("home");
})

app.get("/register",(req,res)=>{
    return res.render("register");
})
const tokengen=async({email})=>{
    return jwt.sign(email,process.env.jwtkey);
}
const sendVerificationEmail = async ({ email, token }) => {   // email verification
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: process.env.cpyemail,
            pass: process.env.pass_key
        }
    });

    const mailOptions = {
        from: process.env.cpyemail,
        to: email,
        subject: "Email Verification",
        html: `Click on the link below to activate your email:<br>
        <a href="http://localhost:${process.env.PORT}/verify-email?token=${token}">Verify Email</a>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Verification email is sent to the email. Check your email.");
    } catch (err) {
        console.log(err);
    }
};
app.get("/verify-email",async(req,res)=>{
    console.log(req.query);
    const {token}=req.query;
    const email=await jwt.verify(token,process.env.jwtkey);
    try{
        const user=await userModel.findOne({email});
        if(!user){
            returnres.send({status:500,message:"error internet"});
        }
        console.log(user);
        if(user.isemailed){
            res.send({message:'user is already his email verfied'})
        }
        user.isemailed=true;
        await user.save();
        return res.redirect("/login");
    }
    catch(error){
        console.log(error);
        return res.send("error during verfication email");     
    }
})
app.post("/register",async(req,res)=>{
    const {name,username,email,password}=req.body;
    try{
        const userexist=await userModel.findOne({email});
        if(userexist){
            return res.send(`user  exist with this email check email enter other email <br> login:<a href="/login">click here</a>`);
        }
        const newuser=new userModel({
            name:name,
            username:username,
            email:email,
            password:password,
        });
        
        await newuser.save();
        const token=await tokengen({email});
        console.log(token);
        await sendVerificationEmail({email,token});
        
        return res.send("email is send on mail for verfication");
    }
    catch(err){
        console.log(err);
        return res.send({status:500,message:"server-side error try again later or refreshed"});
        
    }
    

})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/login',async(req,res)=>{
    console.log(req.body);
    
   
    const {email,password}=req.body;
    try{
        const userexist=await userModel.findOne({email});
        if(!userexist){
            res.send("user not exist with this email");
        }
        // console.log(userexist);
       
        if(!userexist.isemailed){
            return res.send('email is not verfied ');
        }
        if(!(userexist.password===password)){
            return res.send(`invalid password trye again <a href="/login">login again</a>`)
        }
    
        req.session.isAuth=true,
        req.session.user={
            user_Id:userexist._id,
            name:userexist.name,
            email:userexist.email,
            role:userexist.role
        }
        if(userexist.role==="user"){
            console.log("user cannot acces it it is for admin and employee");
            return res.send(`except user cannot login Only employee can access it go back to the home page:<a href="/">home pahe click me</a> `);
        }
        console.log("166");
        
        
        if(userexist.role==="employee" || userexist.role==="admin"){
            return res.redirect('/backend');//goes into the backend to update the data

        }

       
    }
    catch(err){
        console.log(err);
        
    }
})
app.get("/admin",isAuth,async(req,res)=>{
    return res.render('admin'); 
})

app.get("/backend",employeeadmin,isAuth,(req,res)=>{
    console.log("line 172");
    
    return res.render("backendwork");
})
app.post('/createtop1text',isAuth,upload.single('image'),async(req,res)=>{
    const { head, textbody } = req.body;
    const image = req.file;   ///get image
    try{
        const newdata = new dataModel({
            image: {
              data: image.buffer,           // Binary image data
              contentType: image.mimetype  // MIME type of the image (e.g., "image/png")
            },
            head,
            textbody
          });
          await newdata.save();
          return res.redirect('/backend');

    }
    catch(err){
        console.log(err);
        res.send("try again");
    } 
})
app.post('/createtop2text',isAuth,upload.single('image'),async(req,res)=>{
    const { head, textbody } = req.body;
    const image = req.file;    ///get image
    try{
        const newdata = new dataModeltop2({
            image: {
              data: image.buffer,           // Binary image data
              contentType: image.mimetype  // MIME type of the image (e.g., "image/png")
            },
            head,
            textbody
          });
          await newdata.save();
          return res.redirect('/backend');

    }
    catch(err){
        console.log(err);
        res.send("try again");
    } 
})
app.get('/readtop1',isAuth,async(req,res)=>{
    try{
        const data=await dataModel.find({});
        // console.log(data);
        // //convert binary toimage
        const responseData = data.map(item => {//responsData is also array
            const imageBase64 = Buffer.from(item.image.data).toString('base64');
            return {      //store in same data array
              ...item,
              image: `data:${item.image.contentType};base64,${imageBase64}`
            };
          });
        return res.send({status:"200",data:responseData});
        
    }
    catch(err){
        console.log(err);
        
    }

})
app.get('/readtop2',isAuth,async(req,res)=>{

    try{
        const data=await dataModeltop2.find({});
        // console.log(data);
        //convert binary toimage
        const responseData = data.map(item => {//responsData is also array
            const imageBase64 = Buffer.from(item.image.data).toString('base64');
            return {      //store in same data array
              ...item,
              image: `data:${item.image.contentType};base64,${imageBase64}`
            };
          });
          console.log(data);
          
        return res.send({status:"200",data:responseData});
        
    }
    catch(err){
        console.log(err);
        
    }

})

app.get('/employeedata',isAuth,employeeadmin,async(req,res)=>{
    // console.log("hai");
    try{
        const empdata=await userModel.find({});
        // console.log(empdata);
        return res.send({status:200,data:empdata});  
    }
    catch(err){
        console.log(err);
        return res.send("error server-side refreshed again");
    }
    
})


app.post('/deleteuser',isAuth,async(req,res)=>{
    const {_id}=req.body;
    try{
        const empdel=await userModel.findByIdAndDelete(_id);
        console.log(empdel);
        return res.redirect('/employeedata');
        
    }catch(err){
        console.log(err);
        return res.send({status:500,message:"delete succesfully done"});
        
    }
    

})

app.get('/adminlogin',isAuth,(req,res)=>{
    return res.render('adminlogin');
})
app.post('/adminlogin',async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    try{
        const owner=await userModel.findOne({email});
        if(!owner){
            return res.send(`Employees and users cannot acces cannot access this <b>go hompage</b> <a href="/">HOME</a>`)
        }
        if(owner.role==="employee"){
            return res.send(`Employees cannot acces cannot access this <b>go hompage</b> <a href="/">HOME</a>`)
        }
        console.log(owner);
        
        if(owner.password!==password){
            return res.send(`password incorrect login again <a href="/adminlogin">login</a> `)
        }
       return res.redirect('/admin');

    }
    catch(err){
        return res.send({status:500,message:"Serverside error refrehed again or comes later"});
    }

    
})


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})
