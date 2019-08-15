var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

var Student = require('./Student');

Student.findOneAndUpdate({ student_code : 't1234'}, {study_points: 50}, function(err, user) {
    if (err) throw err;
    console.log(user);
  });