const express 	= require('express');
const userModel = require.main.require('./models/patient_userModel');
const router 	= express.Router();


const passport						= require('passport')
const facebookStrategy				= require('passport-facebook').Strategy


router.use(passport.initialize());
router.use(passport.session());



router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
}); 

router.get('/', (req, res)=>{
	console.log('nayeem---------->>>>>>>' , req.user)
		res.render('p_home/index', {uname: req.cookies['uname'] , user_id: req.cookies['user_id']});
	});

/* router.get('/user', (req, res)=>{
	var user = {
		uname: req.cookies['uname']
	}
		res.render('home/index2', {user : user});
	}); */



router.get('/blog', (req, res)=>{
	userModel.getAll_blog(function(results){

		res.render('p_home/blog' , {uname: req.cookies['uname'] , blog : results});
	});
})




router.get('/appointment', (req, res)=>{

		res.render('p_home/appointment' , {uname: req.cookies['uname']});

})

router.post('/appointment', (req, res)=>{

		var dep_name=req.body.dep_name;
		var date=req.body.date;
		var doc_name=req.body.doc_name;
		

		res.render('user/profile',{ap_date:date,dep_name:dep_name,doc_name:doc_name});

})
router.get('/doctors', (req, res)=>{

	userModel.getAll_doctor(function(results){
		var d_id = results[0].d_id;
        //console.log("userModel.getAll_doctor -> d_id", d_id)
	userModel.getById_app(d_id , function(results1){
		
		//console.log(results1[1].day)
		res.render('p_home/doctors' , {uname: req.cookies['uname'],doctor: results,app: results1});
	});
	});


})
router.get('/consult', (req, res)=>{

	res.render('p_home/consult' , {uname: req.cookies['uname'] , user_id : req.cookies['user_id']});

})

router.post('/consult', (req, res)=>{
	var con={
		department : req.body.department,
	 	d_id : req.body.d_id,
	 	p_id : req.body.p_id,
	 	date : req.body.date,
	 	time : req.body.time
	}
    console.log("con", con)
	
	userModel.insert_consult(con , function(results){
    console.log("userModel.insert_consult -> results", results)

		res.redirect('/home/');

	});


})

module.exports = router;