/*b) Tee toinen moduuli joka exporttaa ES6-luokan jolla on nimi. 
Luokassa on kaksi metodia, 'randomNumber', joka arpoo satunnaisluvun ja 'calcAverage' 
joka laskee taulukossa olevien lukujen keskiarvon. Suorita moduuli (ja metodit)
 console.log:illa erillisessä tiedostossa.*/
 class Modb {
    constructor(x, y, newarray) {
        this.x = x;
        this.y = y;
        this.array = newarray;
      }

    randomNumber(){
        let min = Math.ceil(this.x);
        let max = Math.floor(this.y);
        let result = Math.floor(Math.random() * (max - min)) + min;
        return result;
    }
    calcAverage(){
        let sum = 0;
        let array = Object.values(this.array);
        array.forEach(function(i){
            sum += i;
        })
        let answer = Number(sum/array.length);
        return answer;
    }
}
module.exports = Modb;