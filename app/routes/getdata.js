var kafka = require('kafka-node')

var dataOut = { topic: 'wifiscanoutput',
				  value: '{ "macaddresslist": [] }',
				  offset: 176374,
				  partition: 0
			}

var HighLevelConsumer = kafka.HighLevelConsumer
var client = new kafka.Client()
var consumer = new HighLevelConsumer(client,[{ topic: 'wifiscanoutput' }]);

consumer.on('message', function (message) {
	dataOut = message;
	console.log('New Message Arrived')
	console.log(dataOut)
});

exports.getdata = function(req, res) {
	res.send(dataOut)
};