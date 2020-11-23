const express 	= require('express');
//const { param } = require('./home');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const userModel = require.main.require('./models/userModel');
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

module.exports = router;