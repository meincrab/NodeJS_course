var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');
var Student = require('./Student');

Student.findOneAndRemove({student_code: 't1234'}, function(err){
    if (err) throw err;
  console.log('User deleted!');
})