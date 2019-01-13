console.log("welcome to nde-restapi");

const courses = [
    {id:1, name:'test1'},
    {id:2, name:'test2'},
    {id:3, name:'test13'},
    {id:4, name:'test4'},
];


const express = require('express');
const app = express();
const Joi = require('joi');

//route handles for rest
app.get('/',(req,res)=>{
    res.send('request received from')
});

app.get('/api/courses', (req,res)=>{
    res.send([1,2,3]);
});

app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.params)
});

app.get('/api/courses/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    const course = (courses.find(c => c.id === id));
    if(!course) res.status(404).send('course with id +{id} not found');
    res.send(course);
})

app.post('/api/courses', (req,res)=>{

    const schema = Joi.string().min(3).required();
    const result = Joi.validate(req.body, schema);
    if(result.error)
    {
        res.status(400).send(result.error).send("error occured");
        return;
    }
    const course = {
        id : courses.length  + 1,
        name : req.body.name
    };
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port ${port}....')
});