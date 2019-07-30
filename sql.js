var mysql = require('mysql');
var imp = require("./app.js")
//var output=""
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "socket"
 });


 exports.function1=function(){
    con.query('select FROMUSER,MSG FROM socketTABLE1 WHERE TOUSER=?', [imp.joinuser], function(err, res){
      exports.output=JSON.stringify(res)
   if (err){
      throw err;
   }else{
      console.log(res)
    }
   });
};


exports.function2=function(){
	var sql = "INSERT INTO socketTABLE1 (JOINUSERS,FROMUSER,TOUSER,MSG) VALUES ('"+imp.fromuser+"','"+imp.fromuser+"','"+imp.touser+"','"+imp.msg+"')";
    con.query(sql, function (err, res) {
    if (err) throw err;
    console.log("SQL: JOINUSERS & FROMUSER & TOUSER & MSG inserted");
    });
}

