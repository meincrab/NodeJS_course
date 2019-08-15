var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

var Student = require('./Student');

Student.update(
    {
        student_code: "t1234"
    },
    {
        $push : { grades : {course_code: "TestCourse", grade: 5}}
    }, 
    function(err) {
        if (err) throw err;

        console.log('Grade Added!');
    }
)