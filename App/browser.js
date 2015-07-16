var React 	= require('react');
var index   = require('./Components/index.jsx');


if(document.getElementById('index-page')){
	React.render(React.createElement(index), document.getElementById('index-page')); 	
}