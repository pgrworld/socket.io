var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

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


var array = []
io.sockets.on('connection', function (socket) {
 
  socket.on('add-user', function(data){  
  array.push(data.username)
  console.log(array)
    clients[data.username] = {
      "socket": socket.id
    };
  }); 

  socket.on('private-message', function(data){
   console.log(data.text +":" +data.content + " to " + data.username );
    if (clients[data.username]){
      io.sockets.connected[clients[data.username].socket].emit("add-message", data,array);
    } else {
      console.log("User does not exist: " + data.username); 
    }
  });

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
  	for(var name in clients) {
  		if(clients[name].socket === socket.id) {
  			delete clients[name];
  			break;
  		}
  	}	
  })

   socket.emit('userlist', (array) => {    
    });

});





