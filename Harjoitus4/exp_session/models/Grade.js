var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gradesSchema = new Schema ({
    course_code: String,
    grade: Number
},{_id:false});
module.exports = gradesSchema;

/*
grades: [{
    course_code: String,
    grade: Number
}]
*/