/*b) Tee toinen moduuli joka exporttaa ES6-luokan jolla on nimi. 
Luokassa on kaksi metodia, 'randomNumber', joka arpoo satunnaisluvun ja 'calcAverage' 
joka laskee taulukossa olevien lukujen keskiarvon. Suorita moduuli (ja metodit)
 console.log:illa erillisessä tiedostossa.*/

 exports.NamedClass = class NamedClass {
     constructor(min, max, usrArray){
         this.min = min;
         this.max = max;
         this.usrArray = usrArray;
     }
     randomNumber(){
        console.log(Math.random(this.min, this.max));
     }
     calcAverage(){
        var sum = 0;
        this.usrArray.forEach(element => {
            sum += element;
        });
        console.log(sum/this.usrArray.length);
     }
 };