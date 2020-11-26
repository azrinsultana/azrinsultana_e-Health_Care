//declaration
const express 					= require('express');	
const bodyParser 				= require('body-parser');
const exSession 				= require('express-session');
const {check,validationResult} 	= require('express-validator');
const cookieParser 				= require('cookie-parser');
const upload 					= require('express-fileupload');
const flash            			= require('connect-flash');
const forgotpassword			= require('./controllers/forgotpassword');
const home						= require('./controllers/home');
const admin						= require('./controllers/adminController');
const login						= require('./controllers/login');
const logout					= require('./controllers/logout');
const register					= require('./controllers/register');
const pharmacy					= require('./controllers/pharmacy');
const diagnostic				= require('./controllers/diagnostic');
const user						= require('./controllers/user');

const app						= express();
const port						= 3000;
const path						= require('path');

const passport					= require('passport')
const facebookStrategy			= require('passport-facebook').Strategy

//configuration
app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({extended:false});

//middleware
app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload());

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
app.use(passport.initialize());
app.use(passport.session());





//router
app.get('/', (req, res)=>{
    res.render('p_home/index' , {uname  : null});
});

///////for FaceBook Login////////////
app.get('/homepage', (req, res)=>{
	res.cookie('uname', req.user[0].fullname);
   	res.cookie('user_id', req.user[0].user_id);
   	res.cookie('user_email', req.user[0].email);
	   
    //console.log('id------------------------', req.user[0].user_id);
	res.redirect('/home');
});



//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});