console.log("welcome to nde-restapi");

const express = require('express');
const app = express();
const Joi = require('joi');
const log = require('./logger');
const morgan = require('morgan');
const validateCourse = require('./validations');
const routes = require('./courses/routes');

app.use(express.json());
app.use(log);
if(app.get('env') == 'development')
{
    app.use(morgan('tiny'));
}
app.use('/api/courses', routes);

//route handles for rest
app.get('/',(req,res)=>{
    res.send('request received from')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port...." + port);
});