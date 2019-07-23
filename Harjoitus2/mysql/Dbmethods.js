const conn = require('./dbconnection');
const Dbmethods = {
    /*metodi on esitetty oliosyntaksilla eli se on olion sisältämä avain:arvo -pari.
    callback on anonyymi funktio jolla käsitellään kyselyn tulos. Se luodaan
    tiedostoon jossa tämä metodi suoritetaan (add.js)*/

    add: function (student_code, name, email, study_points, callback) {
        return conn.query('insert into Students set student_code = ?, name = ?, email = ?, study_points = ?',
            [student_code, name, email, study_points], callback);
    },
    delete: function(student_code, callback){
        return conn.query('DELETE FROM Students WHERE student_code = ?', 
            [student_code], callback);
    },
    deleteGrade: function(student_code, callback){
        return conn.query('DELETE FROM Grades WHERE student_code = ?', 
            [student_code], callback);
    },
    find: function(study_points, callback){
        return conn.query("SELECT * FROM Students WHERE study_points < '?'", 
            [study_points], callback);
    },
    update: function(study_points, student_code, callback){
        return conn.query("UPDATE Students SET study_points = '?' WHERE student_code = ?", 
            [study_points, student_code], callback);
    }
    
}

module.exports = Dbmethods;

