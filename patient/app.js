//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const upload            = require('express-fileupload');
const { body, validationResult } = require('express-validator');

const login				= require('./controllers/login');
const pharmacy			= require('./controllers/pharmacy');
const logout			= require('./controllers/logout');
const home				= require('./controllers/home');
const user				= require('./controllers/user');
const app				= express();
const port				= 3000;
//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/abc', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(upload());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));


app.use('/login', login);
app.use('/pharmacy', pharmacy);
app.use('/home', home);
app.use('/logout', logout);
app.use('/user', user);

//router
app.get('/', (req, res)=>{
// 	res.send('Welcome');
	res.render('home/index',{ uname : null});

});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});