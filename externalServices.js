var express = require('express');
var app = express();
app.listen(2345);

app.get('/authenticate',function(req,res){
    var name = req.param('name');
    var password = req.param('password');
    console.log('Password'+password);
    var status = 'success';
    if(password != 'password'){
	status = 'failure';
	}
    res.send(status);
    console.log('Authenticate Request'+ status);
});
