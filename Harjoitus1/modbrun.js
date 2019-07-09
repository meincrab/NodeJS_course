const modb = require('./modb.js');

let randomNum = new modb.NamedClass();

randomNum.randomNumber(10,100);
randomNum.calcAverage([0,1,2,3,4,5]);