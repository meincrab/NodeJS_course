module.exports = (app) => {
    const students = require('../controllers/student.controller.js');
    app.get('/students', students.findAll);
    app.get('/students/:studentId', students.findOne);
    app.post('/students', students.addNew);
    app.delete('/students/:studentId', students.delete);
    app.put('/grades/:student_code/:course_code', students.updateGrades);
    app.put('/grades/:student_code', students.updateStudent);
    app.get('/students/points/:points', students.find)
    app.put('/courses/:student_code', students.addNewCourse)

}