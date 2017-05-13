
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , order = require('./routes/order');

var app = express();

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.bodyParser());
//var bodyParser =  require("body-parser");
//app.use(bodyParser.text());
app.use(express.favicon());
app.use(rawBody);
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/order',order.newOrder);
app.get('/order/:order_id', order.getOrder);
app.put('/order/:order_id',order.updateOrder);
app.delete('/order/:order_id',order.deleteOrder);
//app.get('/orders', order.getOrders);
app.post('/order/:order_id/pay', order.pay);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
