const express = require('express');
const routes = express.Router();

const courses = [
    {id:1, name:'test1'},
    {id:2, name:'test2'},
    {id:3, name:'test13'},
    {id:4, name:'test4'},
];

routes.get('/', (req,res)=>{
    res.send(courses);
});


routes.get('/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const course = (courses.find(c => c.id === id));
    if(!course) res.status(404).send('course with id +{id} not found');
    res.send(course);
})

routes.post('/api/courses', (req,res)=>{
    const result = validateCourse(req.body);
    if(result.error)
    {
        res.status(400).send(result.error).send("error occured");
        return;
    }

    const course = {
        id : courses.length  + 1,
        name : req.body.name
    };

    courses.push(course);
    return res.send(course);
})

routes.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send("the course with given id +{req.params.id} not found");
        return;
    }
    
    const resut = validateCourse(req.body);
    if(result.error)
    {
        res.status(400).send(resut.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
})

routes.delete('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send("the course with given id +{req.params.id} not found");
        return;
    }
    
    courses.pop(course);
    res.send(course);
})

module.exports = routes;