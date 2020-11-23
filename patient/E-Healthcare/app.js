//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const {check,validationResult} = require('express-validator');
const cookieParser 		= require('cookie-parser');
const fileUpload 		= require('express-fileupload');
const flash            = require('connect-flash');
const forgotpassword		= require('./controllers/forgotpassword');
const home				= require('./controllers/home');
const admin				= require('./controllers/adminController');
const login				= require('./controllers/login');
const logout				= require('./controllers/logout');
const url             = require('url');
const register			= require('./controllers/register');
const pharmacy			= require('./controllers/pharmacy');
const diagnostic		= require('./controllers/diagnostic');
const user				= require('./controllers/user');


const app				= express();
const port				= 3000;
const $  				= require('jquery');
const path				= require('path');

//configuration
app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({extended:false});

//middleware
app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));
app.use(flash());
app.use('/login', login);
app.use('/forgotpassword',forgotpassword);
app.use('/admin', admin);
app.use('/home', home);
app.use('/logout',logout);
app.use('/register', register);
app.use('/pharmacy', pharmacy);
app.use('/diagnostic', diagnostic);
app.use('/user', user);
//app.use('/admin', admin);



app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
app.use(express.static(path.join(__dirname+'/public'))); 
app.use(fileUpload());
//app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

//router
app.get('/', (req, res)=>{
	res.send('Welcome');
    res.redirect('/home');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});