module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    // Retrieve all Notes
    app.get('/students', students.findAll);

}