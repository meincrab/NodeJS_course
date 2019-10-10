var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GradeSchema = require('./Grade')

// create a schema     required: [ "student_code", "name", "email"],
var studentSchema = new Schema ({

    student_code: {
        type: String,
        required: [true]
    },
    name:{
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    study_points: {
        type: Number,
        min: [0]
    },
    grades:  [GradeSchema]
}, {
    timestamps: true
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;