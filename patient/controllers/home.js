const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('home/index', {uname: req.cookies['uname']});
});


router.get('/userlist', (req, res)=>{

	userModel.getAll_emp(function(results){
		res.render('home/userlist', {users: results});
	});

})


module.exports = router;