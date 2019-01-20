const mdb = require('mongoose');

mdb.connect('mongodb://localhost/palyground',{useNewUrlParser:true})
.then(()=> console.log('connected to db'))
.catch((err)=> console.log(err));

const courseSchema = new mdb.Schema({
    name : 'string',
    author : 'string',
    date : {type:Date , default : Date.now}
});

const Course = mdb.model('Course',courseSchema);

const instructorSchema = new mdb.Schema({
    name : 'string',
    age : 'number'
});

const Instructor = mdb.model('Instructor',instructorSchema);

async function createInstructor(){
    const inst = new Instructor({
        name : 'muralee',
        age : 35
    })

    const result = await inst.save();
    //console.log(result);
}

async function createCourse(){
    const course = new Course({
        name : 'python course',
        author : 'murlee'
    }) ;
    
    const result = await course.save();
    //console.log(result);    
}

async function findCourse()
{
    const course = await Course.find({
        author : 'murlee'
    })
    console.log(course);
}


//createCourse();
//createInstructor();
findCourse();