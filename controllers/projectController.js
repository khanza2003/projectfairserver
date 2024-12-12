const projects=require('../models/projectModel')
//add project
exports.addProjectController=async(req,res)=>{
    console.log("Inside addProjectController");
    const userId=req.userId
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    const{title,languages,overview,github,website}=req.body
    const projectImage=req.file.filename
    try{
        const existingProject=await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already existing.....Please upload another")
        }else{
            const  newProject=new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(err)
    }
}
//get home projects -guest user
exports.getHomeProjectController=async(req,res)=>{
    console.log("Inside getHomeProjectController");
    try{
        const allHomeProjects=await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}
//get home projects-authorized user
exports.getUserProjectController=async(req,res)=>{
    console.log("Inside getUserProjectController");
    const userId=req.userId
    try{
        const allUserProjects=await projects.find({userId})
        res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}
//get home projects-autherised user
exports.getAllProjectController=async(req,res)=>{
    console.log("Inside getAllProjectController");
    //t get query parameter from url use req.query
    const searchKey=req.query.search
    const query={
        languages:{
            //i used to make case insensitive
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allProjects=await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}
//edit project
exports.editProjectController=async(req,res)=>{
   console.log('inside editProjectController');
   //get project id from request parameter
   const{id}=req.params
   //req.body-contains only text type data
   const {title,languages,overview,github,website,projectImage}=req.body
   //to get file data-req file
   const reUploadImageFileName=req.file?req.file.filename:projectImage
   //to get userId-use jwtmiddleware
   const userId=req.userId
   console.log(id,title,languages,overview,github,website,reUploadImageFileName,userId);
   try{
    const updateProject=await  projects.findByIdAndUpdate({_id:id},{
        title,languages,overview,github,website,projectImage:reUploadImageFileName,userId
    },{new:true})
    await updateProject.save()
    res.status(200).json(updateProject)
   }catch(err){
    res.status(401).json(err)
   }
}

//remove projects
exports.removeProjectController=async(req,res)=>{
    //1.get id of the project to be deleted from req params
    const {id}=req.params
    //2.delete the project from given id from model
    try{
        const removeProject=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}