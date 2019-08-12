// var app = require('http').createServer(handler);
// var io = require('socket.io').listen(app);
// var fs = require('fs');
// var sql = require("./sql.js");

// app.listen(3000);
// console.log("running on port NO:3000");

// function handler (req, res) {
//   fs.readFile(__dirname + '/views/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//     res.writeHead(200);
//     res.end(data);
//   });
// };


var express = require('express');
var app = express();
var path    = require("path");
var sql = require("./sql.js");
 app.use(express.static('client',));
 app.use(express.static('css',));

//routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});


server = app.listen(3000)
console.log("running on port:3000");

const io = require("socket.io")(server)

var clients = {};
var array = ""                     //joining users list
var array2 = []                    //leftout users list
var array3= []                     //userslist
var del=""                         //deleting user name
var joinuser=""                  //exporting variable
var fromuser=""
var touser=""
var msg=""

io.sockets.on('connection', function (socket) {
 
  socket.on('add-user', function(data){ 
     del=data.username 
     array3.push(data.username)
     joinuser=data.username
     //exports.joinuser = data.username
     clients[data.username] = {
     "socket": socket.id
  }; 

      array = Object.keys(clients)
      if(array.length != array3.length){
      var position=array2.indexOf(del)
      // delete array2[0]
      delete array2[position] 
     }

     sql.function1(joinuser)                  //joinuser parameter using in sql.js
     exports.myFunction = function(){
     var output = sql.output;
     socket.emit("output",array2,array,output); 
     }         
  }); 
    
    

   socket.on('private-message', function(data){
   console.log(data.text +":" +data.content + " to " + data.username ); 
   fromuser=data.text
   touser=data.username
   msg=data.content

     sql.function2(fromuser,touser,msg)
    //sql.clearDATA()

   if (clients[data.username] && array3.indexOf(joinuser)){
   io.sockets.connected[clients[data.username].socket].emit("add-message", data);    //array,sql.output);
     } else {
      console.log("User does not exist: " + data.username); 
     }
   });

  // //Removing the socket on disconnect
  // socket.on('disconnect', function() {
  //  for(var name in clients) {
  //    if(clients[name].socket === socket.id) {
  //      delete clients[name];
  //      break;
  //    }
  //  } 
  // })

    //Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
      array2.push(name)
      break;
      }
    } 
  })

}); 
