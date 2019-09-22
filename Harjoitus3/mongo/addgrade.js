var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

var Student = require('./models/Student');

Student.update(
    {
        student_code: "t1234"
    },
    {
        $push : { grades : {course_code: "DoubleTestCourse", grade: 5}}
    }, 
    function(err) {
        if (err) throw err;

        console.log('Grade Added!');
    }
)
