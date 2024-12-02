const mongoose=require('mongoose')
const connection_string = process.env.CONNECTIONSTRING
mongoose.connect(connection_string).then((res)=>{
    console.log("MongoDb Atlas Connected Successfully with PFSERVER");
}).catch(err=>{
    console.log("MongoDb Atlas Connection failed!!");
    console.log(err);
})