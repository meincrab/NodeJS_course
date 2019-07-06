/*  Funktio arpoo satunnaisen luvun käyttäjän antamalta väliltä. Suorita moduuli (ja funktio) console.log:illa erillisessä tiedostossa.*/
module.exports = function(min, max){

    if(typeof(min) === 'number' &&  typeof(min) === 'number' && min < max){
        return Math.floor(min + Math. random() * ((max - min) + 1));
    }else {
        return null;
    }

}