var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "socket"
 });
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

var array = []                     //joining users list
var joinuser=""                    //username
var msg=""                         //message
var touser = ""                    //sending username
io.sockets.on('connection', function (socket) {
 
  socket.on('add-user', function(data){    
    array.push(data.username)
    joinuser = data.username
    console.log(array)
    clients[data.username] = {
    "socket": socket.id
  };

    var sql = "INSERT INTO socketTABLE (JOINUSER) VALUES ('"+joinuser+"')";
    con.query(sql, function (err, res) {
    if (err) throw err;
    console.log("SQL: join username inserted");
    });

  }); 



   socket.on('private-message', function(data){
   console.log(data.text +":" +data.content + " to " + data.username );  
   touser=data.username
    msg=data.content

    var sql = "INSERT INTO socketTABLE1 (FROMUSER,TOUSER,MSG) VALUES ('"+data.text+"','"+touser+"','"+msg+"')";
    con.query(sql, function (err, res) {
    if (err) throw err;
    console.log("SQL: touser and message inserted");
    });

    con.query('SELECT MSG FROM socketTABLE1 WHERE FROMUSER=?', [joinuser], function(err, res){
   if (err){
      throw err;
    }else{
      console.log("login success")
    }
  });


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

});



