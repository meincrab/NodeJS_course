var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');
var Student = require('./models/Student');

var newStudent = new Student({
    student_code: 't1234',
    name: 'Testi Opiskelija',
    email: 't1234@jamk.fi',
    study_points: 0,
    grades: [{
        course_code: 'HTS10600',
        grade: 0
    }]
});


newStudent.save(function(err) {
    if (err) throw err;
  
    console.log('User created!');
  });