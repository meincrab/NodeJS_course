exports.randomNumber = function(){
    let x = 100;
    let y = 200;
    let min = Math.ceil(x);
    let max = Math.floor(y);
    let result = Math.floor(Math.random() * (max - min)) + min;
    console.log(result);
    return result;
}
exports.calcAverage = function(){
    let sum = 0;
    let array = [1, 2, 3, 4, 5, 6];
    array = Object.values(array);
    array.forEach(function(i){
        sum += i;
    })
    let answer = Number(sum/array.length);
    console.log(answer);
    return answer;
}