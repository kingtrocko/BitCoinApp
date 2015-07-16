var React 	= require('react');
var http 	= require('http');

var App = React.createClass(
{

	getInitialState: function() {
		return {
			price: '' 
		};
	},

	componentDidMount: function() {
		var _this =  this;
		BitcoinPrices = [];

		http.get('/getcurrentprice', function(res){
			res.on('data', function(result){
				console.log('result ' + JSON.stringify(result));
				var r = JSON.parse(result);
				BitcoinPrices.push(r.total.amount);
				
				_this.setState({
					price: r.total.amount 
				});
			});
		});
	},

	render: function() {
		var price =  this.state.price;

		return (
			<div>
				The current market price is <strong id='lbl-price'> {price} </strong>
				
			</div>
		);
	}

});

module.exports = App;