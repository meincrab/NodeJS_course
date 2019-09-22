var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');
var Student = require('./models/Student');

var newStudent = new Student({
    student_code: 't4321',
    name: 'Toinen Opiskelija',
    email: 't2234@jamk.fi',
    study_points: 0,
    grades: [{
        course_code: 'HTS110600',
        grade: 0
    }]
});


newStudent.save(function(err) {
    if (err) throw err;
  
    console.log('User created!');
  });
