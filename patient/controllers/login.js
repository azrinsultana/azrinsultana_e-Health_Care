const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index',{mesg: req.flash('mesg')});
});

router.post('/', (req, res)=>{

	var user = {

		username: req.body.username,
		password: req.body.password

	};

	userModel.validate(user, function(status){
        console.log("userModel.validate -> status", status)
		if(status != false){



			if(status[0].type == "user"){
				res.cookie('uname', status[0].fullname);

			var user = {
				uname: req.cookies['uname'],
				id : status[0].user_id,
				fullname : status[0].fullname
			}

				res.render('home/index2', {user : user});

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
}); 

module.exports = router;