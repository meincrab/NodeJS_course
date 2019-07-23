/*
 *  add.js lisää uuden Opiskelijan kantaan
 */
const Dbmethods = require('./Dbmethods');

function handleError(err) {
    console.error(err);
    process.exit(1);
}
// add-metodin viimeisenä parametrina on callback, jolla saadaan kyselyn tulos
// tässä tapauksessa tulos kertoo vain lisäyksen onnistumisen eli yksi tietue lisätty.
Dbmethods.add('a1224', 'Ossi Opiskelija', 'a1234@jamk.fi', 95, function(err, result) {
    if (err) {
        return handleError(err);
    }
    console.log(result.affectedRows + ' records inserted' );
});

