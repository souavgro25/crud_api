
const express = require('express');
const app = express();

const { createCourse , findCourse , DeleteCourse ,updateCourse , getCourse , Course}=require('./mongo')

const port = process.env.PORT || 3009


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});

app.use(express.json())



// Routes 

app.get("/",(req,res)=>{
    res.send("hello world")
    console.log(" me start hu")
});

app.get("/api/user",async(req,res)=>{
    const course= await getCourse();
    
    res.send(course);
});


app.get("/api/user/:id",async(req,res)=>{
    const course= await findCourse(req.params.id);
    if(!course) return res.status(400).send("result not found")
    res.send(course);
});


app.post("/api/user",async(req,res)=>{

    
    const course=new Course({
        name:req.body.name,
        author:req.body.author,
        tags:req.body.tags,
        ispublished:req.body.ispublished
    });
    const course1 = await createCourse(course);
    res.send(course1);
});

app.patch("/api/user/:id",async(req,res)=>{
    const course= await findCourse(req.params.id);
    if(!course) return res.status(400).send("result not found")
    
    const course1 = await updateCourse(req.params.id,req.body);
    res.send(course1);
    
})

app.delete("/api/user/:id",async(req,res)=>{
    const course = findCourse(req.params.id);
    if(!course) return res.status(400).send("result not found")
    const course1 = await DeleteCourse(req.params.id)
   

    res.send(course1)
})
