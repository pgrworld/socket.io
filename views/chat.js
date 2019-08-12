$(function(){
  var socket = io.connect('http://localhost:3000');
  var user = ""
  $(".username-form").on("submit", function(){
    
   var username=$(this).children("input").val();
   user=username
   socket.emit("add-user", {"username": username});  

    // Remove this form and show the chat form 
    $(this).remove();
    $("#username").text(username);
    chat_form.show();
    
    socket.on('output', function(data2,data1,output){   
    target = document.getElementById('test');
    for(var i=0;i<data1.length;i++){
    var elem = document.createElement('span'),
    text = document.createTextNode(data1[i]);
    elem.appendChild(text);
      
   if(data2.includes(data1[i])){
      elem.style.color = 'red'
    }else{ 
      elem.style.color = 'green'
    }
    target.appendChild(elem);
  }

   document.getElementById('output').innerHTML ="previous msgs: "+output;           
   // document.getElementById('userlist').innerHTML ="data2:  "+data2;
   });
    return false;
 });



  // Chat form
  var chat_form = $(".chat-form");
  chat_form.on("submit", function(){
   // Send the message to the server
   socket.emit("private-message", {
    "username": $(this).find("input:first").val(),
    "content": $(this).find("textarea").val(),
    "text":user
   });
      
   // Empty the form
   $(this).find("input:first, textarea").val('');
   return false;
 });

 // Whenever we receieve a message, append it to the <ul>
   socket.on("add-message", function(data,array,output){
   $("#messages").append($("<li>", {
   "text":"New Msg From "+data.text+":"+data.content 
   }));
  });
});
