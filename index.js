const express = require('express');
const app = express();
const exphbs = require('express3-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const ShopsApiRoutes = require('./shops');
const logger = require('morgan')

const mongoURL = process.env.MONGO_DB_URL ||
  'mongodb://localhost/shops_api_dbs';

const Models = require('./models');

const models = Models(mongoURL);

const shops_apiRoutes = ShopsApiRoutes(models);

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  },
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "PUT,POST,DELETE");
    return res.status(200).json({})
  }
  next();
});

app.get('/favicon.ico', function(req, res) {
  // res.send('./favicon.ico')
})

app.get('/', function(req, res) {
  res.redirect('/api/shops')
});

//setting up routes
//GET routes
app.get('/api/shops', shops_apiRoutes.allShop);
// app.get('/api/shops/stock', shops_apiRoutes.shopStock);
app.get('/api/shops/customers/location', shops_apiRoutes.customerLocation);


app.post('/api/shops', shops_apiRoutes.addCustomer);
app.post('/api/shops/:shop_name', shops_apiRoutes.deductStock);
app.post('/api/shops/:shop_name/add/:stockadd', shops_apiRoutes.upDateStock);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  // console.error(err.stack);
  res.status(err.status || 500);
  res.json({
    error: {
      Status: err.status,
      message: err.message
    }
  });
  // .send(err.stack)
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
