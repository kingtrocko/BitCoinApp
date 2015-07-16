var express 		= require('express');
var router 			= express.Router();
var Client 			= require('coinbase').Client;
var coinbaseClient 	= new Client(
	{
		'apiKey': 'jAgxFoDiE2keFACH', 
		'apiSecret': 'C5jWqY1NopQ825CqmT668FIukJ6fW5QX'
	});

router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/currentprice', function(req, res){
	coinbaseClient.getBuyPrice({'qty': 1, 'currency': 'USD'}, function(err, obj) {
		res.send(obj);
	});
});

router.get('/getcurrentprice', function(req, res){
	coinbaseClient.getBuyPrice({'qty': 1, 'currency': 'USD'}, function(err, obj) {
		res.json(obj);
	});
});

module.exports = router;
