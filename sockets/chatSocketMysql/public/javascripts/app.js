var socket = io();

//Modelo message
function Message(item)
{
  this.username = item.username;
  this.body = item.body;
}

//Chat viewModel
function ChatViewModel()
{
  var self = this;
  

  //Atributos mensaje
  self.messages = ko.observableArray([]);
  self.newUsername = ko.observable('');
  self.newMessage = ko.observable('');

  //Enviar el mensaje
  self.sendMessage = function(){
    var message = new Message({
      username : self.newUsername(),
      body : self.newMessage()
    });

    //Enviar el mensaje al server
    socket.emit('new message', message); 
    self.newMessage(''); //Limpiar el mensaje
    //$('#message').val();

  }
  //Recibir el mensaje del servidor
  socket.on('new message',function(message){
    //var liMessage = $('<li>').append(message.username + ' : '+message.body);
    var message = new Message(message);
    //$('#messages').append(liMessage);
    self.messages.push(message);
  });

  //Cargar los mensajes del servidor al navegador
  $.get('/messages',function(data){ 
    $.map(data,function(msg){
      self.messages.push(new Message(msg));
    });
  });
}
        //Enviar el mensaje al hacer click al boton
        //$('#send-message').click(function(){          
          /*var message = {
            username : $('#username').val(),
            body : $('#message').val()
          };*/

    
 
        //});                 
 

      

ko.applyBindings(new ChatViewModel());