var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GradeSchema = require('./Grade')

// create a schema
var studentSchema = new Schema ({
    student_code: String,
    name: String,
    email: String,
    study_points: Number,
    grades:  [GradeSchema]
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;