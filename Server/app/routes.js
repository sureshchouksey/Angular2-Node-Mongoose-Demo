var User = require('./models/user');
var Device = require('./models/device');
var mongoose = require('mongoose');
module.exports = function(app,log){

	app.get('/', function(req, res){
		res.send("Hello world");
	});

	app.post('/api/registerDevice',function(req,res){		
		let query = {"userId":req.body.userId,"deviceId":req.body.deviceId};
		Device.findOneAndUpdate(query,req.body,{upsert:true},function(err){
			if(err) throw err;
		})
		res.send("Success!");
	});

	app.get('/api/getDeviceList',function(req,res){
		Device.find({},function(err,devices){
			if(err)
			{
				//log.error(err);
				throw err;
			}	
			res.send(devices);
		})
	});

	app.get('/:id',function(req,res){		
		 Device.find({userId:req.params.id},function(err,device){
		 	if(err)
			{
				//log.error(err);
				throw err;
			}	
		 	console.log('getDeviceByUserId',device);
		 })
	})
	
	app.get('/device/:userId/:deviceId',function(req,res){		
		 Device.find({userId:req.params.userId,deviceId:req.params.deviceId},function(err,device){
		 	if(err)
			{
				//log.error(err);
				throw err;
			}	
		 	console.log('getDeviceByUserId',device);
		 })
	})

	app.post('/api/searchDevice',function(req,res){		
		 var searchDevice = req.body;
		  console.log(req.body);
		 Device.find(searchDevice,function(err,devices){
		 	if(err)
			{
				//log.error(err);
				throw err;
			}
			res.send(devices);	
		 	console.log('getDeviceByUserId',devices);
		 })
	})

	app.get('/drivers/:id', function(req, res){
	return Device.findById(req.params.id, function (err, driver_data) {
			if (!err) {
				console.log(driver_data)
			} else {
				return console.log(err);
			}
		});
	});

	function readLogFile(){
		var stream = fs.createReadStream(__dirname + '/my.log');
		log = new Log('debug', stream);

		log.on('line', function(line){
		console.log(line);
		});
	}

	
}