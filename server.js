const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postsRoute=require('./routes/posts')
const categoryRoute =require('./routes/categories')
const multer=require('multer');
const path = require("path");
const cors=require('cors')

const app=express();
dotenv.config();
//To send and recieve json request
app.use(express.json());
//to get rid of request entity too large error

//Avoid to use limit with multer or You will get an error
//SyntaxError: Unexpected token u in JSON at position 0
// // When you are trying to send data from postman, remove the header and than try to upload,
// and remember to use the same key while uploading the image that you have used during defining multer single method,
// eg: single.('Image', 10);
// from postman send "Image":
// and uncheck the header content : see pic for ref

// app.use(express.json({limit: '50mb',extended:true}));
// app.use(express.urlencoded({limit: '50mb',extended:true}));

//Making images folder public
//whenever someone goes to /images, then use Images folder
app.use("/images", express.static(path.join(__dirname, "/Images")));

app.use(cors());
const port=process.env.PORT || 5000;

const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log('Connected to MongoDB'))
.catch((err)=>{console.log(err)});

//Creating storage for Uploading files
const Imgstorage=multer.diskStorage({
    //destination:where to save the images
    //file=key
    destination:(req,file,cb)=>{
        //callbak take care of any error
cb(null,"./Images");
    },
    //filename:with what filename
filename:(req,file,cb)=>{
    cb(null,req.body.name);
    //req.body.name:what filename client has given
    //file.jpg: dummy name to check api in postman 
}
});

//Uploading files
const upload=multer({storage:Imgstorage});
app.post('/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});


//when someone is on auth path, then use auth route for CRUD
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/posts',postsRoute);
app.use('/categories',categoryRoute);

//sending build file to backend
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.resolve(__dirname, "./Client/build")));

    app.get("*",  (request, response)=> {
        response.sendFile(path.resolve(__dirname, "./Client/build", "index.html"));
      });
}

app.listen(port,()=>{
console.log("Backend is running")
} 
)