var io = require('socket.io').listen(1234);
var request = require('request');
io.sockets.on('connection',function(socket){
	socket.on('handshake',function(data){
		console.log('HandShake Received');
		socket.emit('handshakeResponse',{response:'success'});
	});
	/*
	socket.on('userAuthentication',function(data){
		console.log('userAuthentication');
		var url = 'http://localhost:2345/authenticate?name='+data.name+'&password='+data.password;
		request(url,function(error,response,body){
			if(!error){
				socket.emit('userAuthenticationResponse',{'status':body});
				console.log('userAuthenticationResponse');
			}
		});
	});*/
	socket.on('userAuthentication',function(data){
		if(data.password != 'password'){
			status = 'failure';
		}else{
			status = 'success';
		}
		 socket.emit('userAuthenticationResponse',{'status':status});
		console.log('userAuthenticationResponse'+status);
	});
});
