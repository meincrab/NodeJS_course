var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/studentdb');

var Student = require('./Student');
Student.find({study_points : {$lt : 100}}, function(err, users) {
    if (err) throw err;
    console.log(users);
});