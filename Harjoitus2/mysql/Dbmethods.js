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
    },
    addgrade: function(student_code, course_code, grade){
        return conn.beginTransaction(function(err) {
            if (err) { throw err; }
            conn.query('INSERT INTO grades SET student_code=?, course_code=?, grade=?', [student_code, course_code, grade], function (error) {
              if (error) {
                return conn.rollback(function() {
                  throw error;
                });
              }
              conn.query('UPDATE students SET study_points = study_points + 5 WHERE student_code = ?', [student_code], function (error) {
                if (error) {
                  return conn.rollback(function() {
                    throw error;
                  });
                }
                conn.commit(function(err) {
                  if (err) {
                    return conn.rollback(function() {
                      throw err;
                    });
                  }
                  console.log('success!');
                });
              });
            });
          });
    },
    updategrade: function(student_code, course_code, grade, callback){
        return conn.query('UPDATE grades SET grade = ? WHERE student_code = ? AND course_code = ?', 
            [ grade, student_code, course_code], callback);
    }
}

module.exports = Dbmethods;

