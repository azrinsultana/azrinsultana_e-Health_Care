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
/* router.get('/user', (req, res)=>{
	var user = {
		uname: req.cookies['uname']
	}
		res.render('home/index2', {user : user});
	}); */



router.get('/appointment', (req, res)=>{

		res.render('home/appointment' , {uname: req.cookies['uname']});

})
router.post('/appointment', (req, res)=>{

		var dep_name=req.body.dep_name;
		var date=req.body.date;
		var doc_name=req.body.doc_name;
		

		res.render('user/profile',{ap_date:date,dep_name:dep_name,doc_name:doc_name});

})


module.exports = router;