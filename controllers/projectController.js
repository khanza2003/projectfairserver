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