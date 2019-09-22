var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var gradesSchema = new Schema ({
    course_code : {
        type: String,
        required: [true]
    },
    grade: {
        type: Number,
        min: [0]
    },
});
module.exports = gradesSchema;
