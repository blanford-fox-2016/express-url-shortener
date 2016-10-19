'use strict'
var short_url = ""
var letter = ['a','b','c','d','e']
for(var i=0;i<5;i++){
  short_url += letter[Math.floor(Math.random()*5)]
}

console.log(short_url);
