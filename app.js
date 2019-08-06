var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var sql = require("./sql.js");

app.listen(3000);
console.log("running on port NO:3000");

var clients = {};

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
 }

var array = ""                     //joining users list
var array2 = []                    //leftout users list

io.sockets.on('connection', function (socket) {
 
  socket.on('add-user', function(data){    
    exports.joinuser = data.username
    clients[data.username] = {
    "socket": socket.id
  }; 

     array = Object.keys(clients)
     sql.function1()

     exports.myFunction = function(){
     var output = sql.output;
     socket.emit("output",array2,array,output); 
     }         
  }); 
    
    
   socket.on('private-message', function(data){
   console.log(data.text +":" +data.content + " to " + data.username );  
   exports.fromuser=data.text
   exports.touser=data.username
   exports.msg=data.content

     sql.function2()
    //sql.clearDATA()

   if (clients[data.username]){
   io.sockets.connected[clients[data.username].socket].emit("add-message", data);    //array,sql.output);
     } else {
      console.log("User does not exist: " + data.username); 
     }
   });

  // //Removing the socket on disconnect
  // socket.on('disconnect', function() {
  // 	for(var name in clients) {
  // 		if(clients[name].socket === socket.id) {
  // 			delete clients[name];
  // 			break;
  // 		}
  // 	}	
  // })

    //Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
      if(clients[name].socket === socket.id) {
      array2.push(name)
     //socket.emit("disconnectUL",array2);
      break;
      }
    } 
  })

});










