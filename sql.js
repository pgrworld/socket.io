var mysql = require('mysql');
var imp = require("./app.js")
var today = ""
var month = ""
var time = ""
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "socket"
 });


 exports.function1=function(){
    con.query('select FROMUSER,MSG,TIME FROM socketTABLE1 WHERE TOUSER=?', [imp.joinuser], function(err, res){
      exports.output=JSON.stringify(res)
      imp.myFunction()
   if (err){
      throw err;
   }else{
      console.log(res)
    }
   });
};


exports.function2=function(){
	today=new Date();
	month=today.getMonth();
	month1=month+1
	time= today.getFullYear()+":"+month1+":"+ today.getDate()+":"+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	console.log(time)
	var sql = "INSERT INTO socketTABLE1 (JOINUSERS,FROMUSER,TOUSER,MSG,TIME) VALUES ('"+imp.fromuser+"','"+imp.fromuser+"','"+imp.touser+"','"+imp.msg+"','"+time+"')";
    con.query(sql, function (err, res) {
    if (err) throw err;
    console.log("SQL: JOINUSERS & FROMUSER & TOUSER & MSG inserted");
    });
}

//today.getYear()+":"+ today.getMonth()+":"+ today.getDate()+":"+

exports.clearDATA=function(){
	con.query('delete from socketTABLE1 where TOUSER=?',[imp.joinuser],function(err,res){
		if(err){
			throw err;
		}else{
			console.log("previous msgs deleted")
		}
	});
}
