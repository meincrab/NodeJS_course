/*b) Tee toinen moduuli joka exporttaa ES6-luokan jolla on nimi. 
Luokassa on kaksi metodia, 'randomNumber', joka arpoo satunnaisluvun ja 'calcAverage' 
joka laskee taulukossa olevien lukujen keskiarvon. Suorita moduuli (ja metodit)
 console.log:illa erillisessä tiedostossa.*/

 module.exports.exportedClass;
 class exportedClass {
     randonNumber(){
        console.log(Math.random());
     }
     calcAverage(x){
        var sum = 0;
        x.forEach(element => {
            sum += element;
        });
        console.log(sum/x.length);
     }
 };