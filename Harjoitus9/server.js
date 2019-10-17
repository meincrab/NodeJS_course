/*Mahdollisiman yksinkertinen chatti Socket.io:lla
 * Socket.io:n toimita perustuu eventteihin. Socket
 * periin Noden events.eventEmitter -luokan  joten se
 * voi emittoida eventtejä.
 * 
 * Projektiin pitää asentaa socket.io: npm install socket.io
 */

let http = require('http');
let fs = require('fs');
let Moniker = require('moniker');
let users = [];


let randomNum = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

let randNumFirst = randomNum(0, 100000);
let randNumSecond = randomNum(0, 100000);
let thisGameRand = randNumFirst > randNumSecond ? randomNum(randNumSecond , randNumFirst) : randomNum(randNumFirst, randNumSecond);
let numbers = [randNumFirst, randNumSecond];
console.log(thisGameRand);
let addUser = () =>{
    let user = {
        name: Moniker.choose(),
        attempts: 0
    }
    users.push(user);
    updateUsers();
    return user;
}

let removeUser = (user) => {
    for(let i=0; i<users.length;i++){
        if(user.name === users[i].name) {
            users.splice(i,1);
            updateUsers();
            return;
        }
    }
}

let updateUsers = () => {
    let str = '';
    for (let i=0; i< users.length; i++) {
        let user = users[i];
        str += user.name + ' <small>(' + user.attempts + ' attempts)</small><br />';
    }
    io.sockets.emit("users", { users: str });
}


//http-serveri joka laitetaan muuttujaan app tuottaa sivun client.html
let app = http.createServer(function (req, res) {
    fs.readFile("client.html", 'utf-8', function (error, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(3010);
console.log('Http server in port 3010');
 
//Socket-serveri kuuntelee http-serveriä
let io = require('socket.io').listen(app);
 
//'connection'-tapahtuma suoritetaan joka kerta kun joku clientin 
//socket yhdistää serverin socket.io moduliin. Parametrina
//oleva muuttuja socket on viittaus clientin socketiin
io.sockets.on('connection', function(socket) {
    let user = addUser();
    console.log(user);
    socket.emit('welcome', user);
    socket.emit('numbers', numbers)
    socket.on('disconnect', function () {
        removeUser(user);
    });
    //Kun clientilta tulee 'message to server' -tapahtuma 
    socket.on('message_to_server', function(data) {
        //Lähetetään tullut data takaisin kaikille clientin socketeille
        //emitoimalla tapahtuma 'message_to_client' jolla lähtee JSON-dataa
        console.log(data.message);
        if(!Number.isInteger(Number.parseInt(data.message))){
            console.log("not a number");
            io.sockets.emit("message_to_client",{ message: "Not a number or not an integer, sorry" });
        }
        else{ 
            if(thisGameRand < (Number.parseInt(data.message))){
                io.sockets.emit("message_to_client",{ message: data["message"] + " is too big" });
            }
            else if(thisGameRand > (Number.parseInt(data.message))) { 
                io.sockets.emit("message_to_client",{ message: data["message"] + " is too small" });
            }
            else {
                io.sockets.emit("message_to_client", { message:data["message"] + " This is a Winner number!" });
            }
            
        }   
        updateUsers();
    });
});