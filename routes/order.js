
var mongo = require('./mongo');
var uuidV1 = require('uuid/v1');
var mongourl = "mongodb://localhost:27017/starbucks-tenant";

//Post method for creating new order
function newOrder(req,res){
	var id = uuidV1();
	var output = {"id": id, "location": req.param('location'),"items":req.param('items'),"links": [{"payment": "http://localhost:3000/order/"+id+"/pay", "order": "http://localhost:3000/order/"+id+""}],"status":"PLACED","message":"Order has been placed" };
	mongo.connect(mongourl,function()
			{
		console.log("Connected to mongo at:" +mongourl);
		var col = mongo.collection('order');
		col.insert(output,function(error,result)
				{
			if(result)
			{
				res.send(output);
			}
			else 
			{
				output.status = "error";
				output.message = "Server Error, Try Again Later.";
				res.status(500).send(JSON.stringify(output));
			}
				});
			});
}

//Get method to return the current state of order

function getOrder(req,res){
	var output={"status":"","message":""};

	var order_id = req.param('order_id');
	console.log(order_id);
	if(order_id == ""|| order_id == null)
	{
		output.status = "error";
		output.message = "Order not found";
		res.status(406).send(output);

	}

	mongo.connect(mongourl,function(){
		console.log("Connected to mongo at:" +mongourl);
		var col = mongo.collection('order');
		col.findOne({"id": order_id},{"_id":0},function(error,result){
			if(result)
			{
				console.log(result);
				if(result == null)
				{
					output.status = "error";
					output.message = "Order not found";
					res.status(406).send(output);

				}
				else 
					res.send(result);
			}
			else 
			{
				output.status = "error";
				output.message = "Server Error, Try Again Later.";
				res.status(500).send(output);
			}
		});
	});
}

//Put method to update an order 
function updateOrder(req,res){
	var order_id = req.param('order_id');
	var output = {"id": order_id, "location": req.param('location'),"items":req.param('items'),"links": [{"payment": "http://localhost:3000/order/"+order_id+"/pay", "order": "http://localhost:3000/order/"+order_id+""}],"status":"PLACED","message":"Order has been placed" };
	if(order_id == ""|| order_id == null)
	{
		output = {};
		output.status = "error";
		output.message = "Order not found";
		res.status(406).send(output);

	}

	mongo.connect(mongourl,function(){

		console.log("Connected to mongo at:" +mongourl);
		var col = mongo.collection('order');
		col.update({"id":order_id},{$set:{"location": req.param('location'), "items": req.param('items')}},function(err,result){
			if(result)
			{
				if(result == null)
				{
					output = {};
					output.status = "error";
					output.message = "Order not found";
					res.status(406).send(output);

				}
				else 
				{
					res.status(200).send(output);
				}
			}
			else 
			{
				output = {};
				output.status = "error";
				output.message = "Server Error, Try Again Later.";
				res.status(500).send(JSON.stringify(output));
			}
		});
	});
}

//Delete the order 
function deleteOrder(req,res){
	var order_id = req.param('order_id');
	var output = {"status":"", "message": ""};

	if(order_id == ""|| order_id == null)
	{
		output.status = "error";
		output.message = "Order not found";
		res.status(406).send(output);
	}
	mongo.connect(mongourl,function(){
		console.log("Connected to mongo at:" +mongourl);
		var col = mongo.collection('order');
		col.findOne({"id": order_id},{"_id":0, "status":1},function(error,result){
			if(result)
			{
				if(result == null)
				{
					output = {};
					output.status = "error";
					output.message = "Order not found";
					res.status(406).send(output);

				}
				else if(result.status !== "PLACED")
				{
					output = {};
					output.status = "error";
					output.message = "Order Cancelling Rejected";
					res.status(406).send(output);
				}
				else 
				{
					col.deleteOne({"id":order_id});
					res.status(204).send();
				}

			}
			else {
				output = {};
				output.status = "error";
				output.message = "Server Error, Try Again Later.";
				res.status(500).send(JSON.stringify(output));	
			}
		});
	});

}

//Get method to return open orders
function getOrders(req,res){
	var output = {"id": id, "location": req.param('location'),"items":req.param('items'),"links": [{"payment": "http://localhost:3000/order/"+id+"/pay", "order": "http://localhost:3000/order/"+id+""}],"status":"PLACED","message":"Order has been placed" };
	mongo.connect(mongourl,function(){
		console.log("Connected to mongo at:" +mongourl);
		var col = mongo.collection('order');
		col.find({},function(err,result){
		if(result)
			{
			res.status(204).send(output);
			}
		else {
			output = {};
			output.status = "error";
			output.message = "Server Error, Try Again Later.";
			res.status(500).send(JSON.stringify(output));	
		}
		});
		});
}


exports.newOrder = newOrder; 
exports.getOrder = getOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.getOrders = getOrders;