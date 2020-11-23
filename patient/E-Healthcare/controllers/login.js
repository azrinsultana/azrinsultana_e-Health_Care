const express 	= require('express');
//const { param } = require('./home');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const userModel = require.main.require('./models/userModel');
const patient_userModel = require.main.require('./models/patient_userModel');
const router 	= express.Router();
const urlencodedParser  =bodyParser.urlencoded({ extended:false })

const passport						= require('passport')
const facebookStrategy				= require('passport-facebook').Strategy


router.use(passport.initialize());
router.use(passport.session());


router.get('/', (req, res)=>{
	res.render('login/index',{mesg: req.flash('mesg')});
});

router.post('/'
, urlencodedParser,[
	check('username' , 'username cannot Empty')
	.exists()
	.isLength({min : 1}),
	check('password' , 'password cannot Empty')
	.exists()
	.isLength({min : 1}),
	
] 
,
 (req, res)=>{

	const errors = validationResult(req)
	if(!errors.isEmpty()){
		//return res.status(422).jsonp(errors.array())
		 const alert = errors.array()
		res.render('login/index' , {alert,mesg:'Username and Password Incorrect'});
	}
	else{ 
		var user = {

			username: req.body.username,
			password: req.body.password

		};

	userModel.validate(user, function(status){
        console.log("userModel.validate -> status", status)
		if(status != false){


			if(status[0].type == "user"){
					res.cookie('uname', status[0].fullname);
					res.cookie('user_id', status[0].user_id);

				var user = {
					uname: req.cookies['uname'],
					id : status[0].user_id,
					fullname : status[0].fullname
				}

					res.redirect('/home');

				}
				else if(status[0].type == "admin"){
					res.cookie('uname', status[0].fullname);
					res.cookie('user_id', status[0].user_id);

				var user = {
					uname: req.cookies['uname'],
					id : status[0].user_id,
					fullname : status[0].fullname
				}

					res.redirect('/admin');

				}
				else if(status[0].type == "doctor"){
					res.cookie('uname', status[0].fullname);
					res.cookie('user_id', status[0].user_id);

				var user = {
					uname: req.cookies['uname'],
					id : status[0].user_id,
					fullname : status[0].fullname
				}

					res.redirect('/d_home/');

				}




			}
			/* else if(status[0].type == "user") {
				res.cookie('uname', req.body.username);
				res.redirect('/user_home');
			} */

		else{
			req.flash('mesg' , 'Username and Password Incorrect')
			res.redirect('/login');
		}

		/* if(status){
				res.cookie('uname', req.body.username);
				res.redirect('/home');
		}else{
			res.redirect('/login');
		} */
	});

	}
}); 

///////////////////Facebook Login//////////////////



passport.use(new facebookStrategy({
	clientID        : "374690143860625",
    clientSecret    : "8201f44781e3ecfe5228895723a2383d",
	callbackURL     : "http://localhost:3000/login/facebook/callback",
	profileFields	: ['id' , 'displayName' , 'name' , 'picture.type(large)' , 'email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {
		//console.log(profile.id)
		console.log("email---------------------", profile.displayName)
		//console.log("profile", profile.displayName)
		//var e = profile.email.value;
		//console.log(e)
		// find the user in the database based on their facebook id
	

		patient_userModel.find_fb_email( profile.emails[0].value , function(err , user) {
		//console.log("1 - user", user)
		// if there is an error, stop everything and return that
		// ie an error connecting to the database
		if (err && user == ''){
		//console.log("2 - user", user)
		//console.log("error", err)
			return done(err);
		}
		// if the user is found, then log them in
		if (user && user !='new_fb') {
			//console.log("3 - user found")
			//console.log(user)
			return done(null, user); // user found, return that user
		} else if (user == 'new_fb') {
			// if there is no user found with that facebook id, create them		
			var fb_user = {
				email : profile.emails[0].value,
				fullname : profile.displayName,
			}	
			
			patient_userModel.insert_fb_user(fb_user , function(result){
				return done(null , fb_user);
			}) 					
		}


		});

	})

}));

passport.serializeUser(function(user, done) {
    console.log("user -> 1", user)
    done(null, user[0].email);
});
// used to deserialize the user
passport.deserializeUser(function(email, done) {
	console.log("id===",email)
    patient_userModel.find_fb_email(email, function(err, user) {
   	//console.log("user - d", user)
	//console.log("err - d", err)
        done(err, user);
    });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/homepage',
			failureRedirect : '/login'
		}));

module.exports = router;