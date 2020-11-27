//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
//const expressValidator  =require('express-validator');

const login				= require('./controllers/login');
const doctor	   		= require('./controllers/doctor');
const blog		   		= require('./controllers/blog');
const logout			= require('./controllers/logout');
const home				= require('./controllers/home');
const consulting		= require('./controllers/consulting');
//const user				= require('./controllers/user'); 
const app				= express();
const port				= 3000;


//configuration
app.set('view engine', 'ejs');



//middleware
app.use('/abc', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));
//app.use(expressValidator());


app.use('/login', login);
app.use('/home', home);
app.use('/blog', blog);

app.use('/doctor',doctor);
app.use('/consulting', consulting);
app.use('/logout', logout);
//app.use('/user', user);

//router
app.get('/', (req, res)=>{
	res.send('Welcome');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});