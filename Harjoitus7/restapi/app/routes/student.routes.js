module.exports = (app) => {
    const students = require('../controllers/student.controller.js');
    const authorize = require('../../verifytoken');

    app.get('/students', authorize, students.findAll);
    app.get('/students/:studentId', students.findOne);
    app.post('/students', students.addNew);
    app.delete('/students/:studentId',authorize, students.delete);
    app.put('/grades/:student_code/:course_code',authorize, students.updateGrades);
    app.put('/grades/:student_code',authorize, students.updateStudent);
    app.get('/students/points/:points', students.find);
    app.put('/courses/:student_code',authorize, students.addNewCourse);
}