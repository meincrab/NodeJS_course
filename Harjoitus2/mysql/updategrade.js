const Dbmethods = require('./Dbmethods');
function handleError(err) {
    console.error(err);
    process.exit(1);
}

Dbmethods.updategrade('a1234', 'test_code', 4, function(err, result) {
    if (err) {
        return handleError(err);
    }
    console.log(result.affectedRows + ' records inserted' );
});

//Task 2 work in progress