var kafka = require('kafka-node')

var dataOut = { topic: 'wifiscanoutput',
				  value: '{ "macaddresslist": [ { "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Rainier", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "Develop2", "new": 0, "rssi": -65 },{ "mac":"00:0e:58:49:03:39", "loc": "MtHood", "new": 0, "rssi": -65 },{ "mac":"00:1e:65:92:30:e6", "loc": "MtHood", "new": 0, "rssi": -85 },{ "mac":"00:6b:9e:08:75:9a", "loc": "MtHood", "new": 0, "rssi": -79 },{ "mac":"08:11:96:b6:de:d8", "loc": "MtHood", "new": 0, "rssi": -81 },{ "mac":"0c:8b:fd:49:b6:eb", "loc": "Develop2", "new": 0, "rssi": -69 },{ "mac":"10:40:f3:ef:7d:66", "loc": "MtHood", "new": 0, "rssi": -77 },{ "mac":"18:ee:69:46:d7:cb", "loc": "Develop2", "new": 0, "rssi": -91 },{ "mac":"28:b2:bd:03:66:64", "loc": "MtHood", "new": 0, "rssi": -49 },{ "mac":"2c:54:cf:ff:61:73", "loc": "MtHood", "new": 0, "rssi": -83 },{ "mac":"30:59:b7:09:7a:1c", "loc": "MtHood", "new": 1, "rssi": -79 },{ "mac":"30:59:b7:09:7f:98", "loc": "MtHood", "new": 0, "rssi": -75 },{ "mac":"34:02:86:4b:77:5b", "loc": "Develop2", "new": 0, "rssi": -81 },{ "mac":"34:e6:ad:87:04:e2", "loc": "Develop2", "new": 0, "rssi": -77 },{ "mac":"3c:77:e6:b1:16:cf", "loc": "MtHood", "new": 0, "rssi": -67 },{ "mac":"42:0d:f4:a1:50:dd", "loc": "MtHood", "new": 0, "rssi": -55 },{ "mac":"42:62:37:c7:46:ba", "loc": "MtHood", "new": 0, "rssi": -87 },{ "mac":"54:72:4f:c4:d0:21", "loc": "Develop2", "new": 1, "rssi": -85 },{ "mac":"64:20:0c:b7:94:e0", "loc": "MtHood", "new": 0, "rssi": -89 },{ "mac":"64:80:99:07:79:d8", "loc": "Develop2", "new": 0, "rssi": -69 },{ "mac":"68:94:23:10:2e:a7", "loc": "MtHood", "new": 0, "rssi": -69 },{ "mac":"74:e1:b6:a5:99:f0", "loc": "MtHood", "new": 0, "rssi": -85 },{ "mac":"74:e5:0b:52:55:18", "loc": "Develop2", "new": 0, "rssi": -85 },{ "mac":"78:a3:e4:a3:8d:6a", "loc": "MtHood", "new": 0, "rssi": -69 },{ "mac":"80:be:05:b3:4d:d9", "loc": "Develop2", "new": 0, "rssi": -51 },{ "mac":"90:b6:86:25:d8:dc", "loc": "Develop2", "new": 0, "rssi": -69 },{ "mac":"90:b6:86:79:e9:6a", "loc": "MtHood", "new": 0, "rssi": -65 },{ "mac":"a0:18:28:31:60:d4", "loc": "MtHood", "new": 0, "rssi": -65 },{ "mac":"a0:a8:cd:2e:e6:09", "loc": "MtHood", "new": 0, "rssi": -91 },{ "mac":"ac:72:89:c7:f5:d8", "loc": "Develop2", "new": 0, "rssi": -89 },{ "mac":"b8:4f:d5:14:29:63", "loc": "MtHood", "new": 0, "rssi": -85 },{ "mac":"b8:78:2e:2d:58:ba", "loc": "MtHood", "new": 0, "rssi": -85 },{ "mac":"b8:e9:37:52:74:89", "loc": "Develop2", "new": 0, "rssi": -67 },{ "mac":"b8:e9:37:b6:5a:d7", "loc": "Develop2", "new": 0, "rssi": -71 },{ "mac":"bc:ee:7b:a3:d2:1e", "loc": "Develop2", "new": 0, "rssi": -89 },{ "mac":"c0:33:5e:16:5c:9f", "loc": "MtHood", "new": 0, "rssi": -75 },{ "mac":"c4:d9:87:4b:10:8b", "loc": "MtHood", "new": 0, "rssi": -59 },{ "mac":"d8:bb:2c:25:32:8d", "loc": "MtHood", "new": 1, "rssi": -59 },{ "mac":"da:a1:19:eb:4f:79", "loc": "Develop2", "new": 0, "rssi": -83 },{ "mac":"dc:85:de:3a:89:b2", "loc": "MtHood", "new": 0, "rssi": -75 },{ "mac":"ec:1f:72:1c:24:87", "loc": "Develop2", "new": 1, "rssi": -83 },{ "mac":"f0:4f:7c:85:f1:92", "loc": "MtHood", "new": 0, "rssi": -79 },{ "mac":"fc:c2:de:16:b5:03", "loc": "Develop2", "new": 0, "rssi": -87 } ] }',
				  offset: 176374,
				  partition: 0
			}

exports.getdata = function(req, res) {

	var HighLevelConsumer = kafka.HighLevelConsumer
	var client = new kafka.Client()
	var consumer = new HighLevelConsumer(client,[{ topic: 'wifiscanoutput' }]);

	consumer.on('message', function (message) {
		dataOut = message;
		console.log('New Message Arrived')
		console.log(dataOut)
	});

	res.send(dataOut)

};