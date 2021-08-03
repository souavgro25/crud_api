const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true , useUnifiedTopology: true }    )
.then(()=>console.log("coonected to mongoose"))
.catch((err)=>console.log("error "+err))

    const courseSchema = new mongoose.Schema({
        name:String,
        author:String,
        tags:[String],
        date: {type:Date,Default:Date.now},
        ispublished:Boolean
    });
    
    const Course = mongoose.model("course", courseSchema );
    
    async function createCourse(course){
         
    
        const result = await course.save();
        return course
    }
    
    async function getCourse(){
        const course= await Course.find()
        .limit(10)
        return course;
    }
    
    async function findCourse(id){
       
        const course= await Course.findById(id)
        return course
    
    }
      
    async function DeleteCourse(id){

        const course = await Course.deleteOne({_id:id})
          
       return course
    }

    async function updateCourse(id,Course1){

        const course = await Course.findByIdAndUpdate(id,
            {
                name:Course1.name,
                ispublished:Course1.ispublished,
                author:Course1.author,
                tags:Course1.tags
            },{new:true})
       return course
    }

module.exports ={ createCourse , findCourse , DeleteCourse ,updateCourse , getCourse , Course}