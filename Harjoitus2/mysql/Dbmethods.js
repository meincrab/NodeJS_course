const conn = require('./dbconnection');

const Dbmethods = {
    /*metodi on esitetty oliosyntaksilla eli se on olion sisältämä avain:arvo -pari.
    callback on anonyymi funktio jolla käsitellään kyselyn tulos. Se luodaan
    tiedostoon jossa tämä metodi suoritetaan (add.js)*/

    add: function (student_code, name, email, study_points, callback) {
        return conn.query('insert into Students set student_code = ?, name = ?, email = ?, study_points = ?',
            [student_code, name, email, study_points], callback);
    }
    // Tee tähän muut metodit
};
module.exports = Dbmethods;
