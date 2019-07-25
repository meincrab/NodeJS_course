const Dbmethods = require('./Dbmethods');
function handleError(err) {
    console.error(err);
    process.exit(1);
}

Dbmethods.addgrade('a1234', 'test_code', 10, function(err, result) {
    if (err) {
        return handleError(err);
    }
    console.log(result);
});
