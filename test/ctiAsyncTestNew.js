var should = require('should');
var async = require('async');
var request = require('request');
var io = require('socket.io-client');
var socketURL = 'http://0.0.0.0:1234';
var options ={
  transports: ['websocket'],
  'forceNew': true
};
var client = io.connect(socketURL,options);
var data_driven = require('data-driven');
var users = [{name:'A',password:'password',expected:'success'},{name:'B',password:'badpassword',expected:'failure'}];
//var users = {name:'A',password:'password',expected:'success'};
describe('socket Interaction test' , function(){
/*	
	describe('handshake test',function(){
	it('should check if handshake is proper',function(done){
		//var client = io.connect(socketURL,options);
		client.on('connect',function(data){
			client.emit('handshake',{});
		});
		client.on('handshakeResponse',function(response){
			response.response.should.equal('success');
			done();
		});
	});

	});*/
function socketInteraction(users,cb){
                                client.on('userAuthenticationResponse',function(response){
                                        console.log('Resp'+response.status +'Expected'+users.expected);
                                        	//response.status.should.equal(users.expected);
					cb(response.status);
                                });

}
	describe('Mutiple login Test Async',function(){
			it('Usersss',function(done){
			users.forEach(function(users){
			async.series([
				function(cb){
				console.log(users.name);
				//socketInteraction(users,done);
				//done();
				client.emit('userAuthentication',{'name':users.name,'password':users.password});
				cb();
				},
				function(cb){
				socketInteraction(users,function(result){
					result.should.equal(users.expected);
					done();
				});
				cb();
				}
			],function(err) {
				console.log('end of series'+err);
			});
			});
			});
	});
	//done();
});
/*
describe('Test External Service',function(){
var url = 'http://localhost:2345';
	describe('Authenticate test',function(){
		url = url+'/authenticate?name=vineeth&password=vineeth@123';
		it('should validate authenticate response',function(done){
			request(url,function(error,response,body){
				body.should.equal('failure');
				done();
			});	
		});
	});
});
*/
