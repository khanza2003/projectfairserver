// register
exports.registerController=(req,res)=>{
    console.log("Inside registerController");
    const {username,email,password}=req.body
    console.log(username,email,password);
    
    res.status(200).json("Request Recieved")
    
}

// login
// profile updation