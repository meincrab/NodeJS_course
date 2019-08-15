var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

var Student = require('./Student');

Student.findOneAndUpdate(
    {student_code: 't1234', "grades.course_code": 'HTS10600'}, {"grades.$.grade": 3}, 
    function(err) {
        if (err) throw err;

        console.log('Grade Updated!');
    }
);