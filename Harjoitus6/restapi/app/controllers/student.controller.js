const Student = require('../models/Student.js');

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with code " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with code " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with code " + req.params.studentId
        });
    });
};

exports.addNew = (req, res) => {
    // Validate request
    if(!req.body.student_code) {
        return res.status(400).send({
            message: "Student code content can not be empty"
        });
    }

    // Create a Student
    const student = new Student({
        student_code: req.body.student_code || "No code given",
        name: req.body.name || "no Name student",
        email: req.body.email || "no Email Given",
        study_points: req.body.study_points
    });

    // Save Student in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};

exports.updateGrades = (req, res) => {
    // Validate Request
    if(!req.body.grade) {
        return res.status(400).send({
            message: "Gradezzz content can not be empty"
        });
    } 
    // Find student grades and update it with the request body
    Student.findOneAndUpdate({student_code : req.params.student_code, 'grades.course_code':req.params.course_code},{
        'grades.$.grade' : req.body.grade
        }, {new: true})

        .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with code " + req.params.student_code
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.student_code
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.student_code
        });
    });
};

exports.updateStudent = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    } 
    // Find student grades and update it with the request body
    Student.findOneAndUpdate({student_code : req.params.student_code},{
        email : req.body.email,
        study_points : req.body.study_points
        }, {new: true})
        .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with code " + req.params.student_code
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.student_code
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.student_code
        });
    });
};

exports.find = (req, res) => {
    Student.find({study_points : {$lt : req.params.points}})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with code " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with code " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with code " + req.params.studentId
        });
    });
};

exports.addNewCourse = (req, res) => {
    // Validate request
    if(!req.body.course_code) {
        return res.status(400).send({
            message: "Course code can not be empty"
        });
    }
    // Save Student in the database
    Student.update({student_code : req.params.student_code},
        {
            $push : { grades : {course_code: req.body.course_code, grade: req.body.grade}}
        })
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding new course."
        });
    });
};