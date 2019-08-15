var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var studentSchema = new Schema ({
    student_code: String,
    name: String,
    email: String,
    study_points: Number,
});

var Student = mongoose.model('Student', studentSchema);

// make this available to our users in our Node applications
module.exports = Student;

/*
grades: [{
    course_code: String,
    grade: Number
}]
*/