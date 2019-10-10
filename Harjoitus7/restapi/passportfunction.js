const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./app/models/User');
const configAuth = require('./auth');

/* Anonyymi funktio joka palauttaa Google-käyttäjän kannasta tai luo uuden käyttäjän kantaan
ja palauttaa sen. Käyttäjän tiedot saadaan Googlen login-applikaatiosta.
Funktio käyttää passport-kirjastoa joten passport-kirjasto tulee funktioon parametrina.
Tämä anonyymi funktio on importattu app.js -tiedostoon jossa se saa parametrikseen passportin.
Funktio ajetaan siis aina kun app.js käynnistyy.
 */
module.exports = function (passport) {

    // passportin login-session vaatii käyttäjän serialisointa (olio merkkijonoksi)
    // passportissa on tähän omat metodit
    // serialisointi
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // ja deserialisointi
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        // haetaan Googlen login-applikaation data configAuthista
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },
    function (token, refreshToken, profile, done) {
        // User.findOne ei käynnisty ennen kuin kaikki data on saatu Googlelta
        process.nextTick(function () {

            // Haetaan käyttäjää kannasta Googlelta saadun profile.id:n perusteella
            User.findOne({
                'google.id': profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    // jos käyttäjä löytyy kannasta se palautetaan
                    return done(null, user);
                } else {
                    // jos käyttäjää ei ole kannassa tehdään uusi käyttäjä
                    const newUser = new User();

                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    // käyttäjä kantaan
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        // palautetaan uusi käyttäjä
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
