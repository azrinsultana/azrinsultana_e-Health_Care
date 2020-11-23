const express 	= require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { search } = require('./home');
const { param } = require('./home');
const userModel = require.main.require('./models/patient_userModel');
const router 	= express.Router();

const urlencodedParser  =bodyParser.urlencoded({ extended:false })

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/profile/:id', (req, res)=>{
	userModel.getById_user(req.params.id, function(results){
		var p_info ={
			id : results[0].user_id,
			fullname : results[0].fullname,
			email : results[0].email,
			password : results[0].password,
			photo : results[0].photo,
			contactno : results[0].contactno
		}
        console.log("userModel.getById_user -> p_info", p_info)
		
		userModel.getById_patient(req.params.id, function(results){
			var h_info ={
				p_birth_date : results[0].p_birth_date,
				p_address : results[0].p_address,
				p_blood_group: results[0].p_blood_group,
				p_bmi: results[0].p_bmi,
				p_weight: results[0].p_weight,
				p_blood_p: results[0].p_blood_p,
				p_cal_in: results[0].p_cal_in
			}

			userModel.getById_consult(req.params.id, function(results3){
				userModel.getById_payment(req.params.id, function(results4){
					res.render('user/profile', {p_info : p_info , h_info : h_info, consult_info : results3 , payment_info : results4});
				});
			});
		});
	});
});


router.get('/payment/:p_id/:d_id', (req, res)=>{
	var p_id = req.params.p_id;
	var d_id = req.params.d_id;
	res.render('user/payment' , { p_id : p_id ,  d_id : d_id} )
});

router.post('/payment/:p_id/:d_id', (req, res)=>{
	
	var payment ={
		p_id : req.params.p_id,
		d_id : req.params.d_id,
		gateway : req.body.gateway,
		payment_date : req.body.payment_date,
		payment_status : req.body.payment_status
	}
	userModel.insert_payment(payment, function(results){
		res.redirect('/home/');
	});
});

router.get('/edit_info/:id', (req, res)=>{
	
	userModel.getById_user(req.params.id, function(results){
		var p_info ={
			email : results[0].email,
			password : results[0].password,
			contactno : results[0].contactno
		}
		
		userModel.getById_patient(req.params.id, function(results){
			var h_info ={
				p_address : results[0].p_address,
				p_bmi: results[0].p_bmi,
				p_weight: results[0].p_weight,
				p_blood_p: results[0].p_blood_p,
				p_cal_in: results[0].p_cal_in
			}
			res.render('user/edit', {p_info: p_info , h_info: h_info});
		});
	});
	
});

router.post('/edit_info/:id'
 , urlencodedParser,[
	check('email' , 'Email cannot be Empty')
	.exists(),
	check('password' , 'password  must be 8 character')
	.exists()
	.isLength({min : 8}),
	check('contactno' , 'Contact number must be 11 character')
	.exists()
	.isLength({min : 11}),
	check('p_address' , 'Address  must be 5 character')
	.exists()
	.isLength({min : 5}),
	check('p_bmi' , 'BMI cannot be Empty')
	.exists(),
	check('p_weight' , 'wWeight cannot be Empty')
	.exists(),
	check('p_blood_p' , 'Blood Presure cannot be Empty')
	.exists(),
	check('p_cal_in' , 'Calorie Intake cannot be Empty')
	.exists(),
] 
, (req, res)=>{
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return res.status(422).jsonp(errors.array())
				
			}
			else{ 
				var user = {
					id: req.params.id,
					email : req.body.email,
					password : req.body.password,
					contactno : req.body.contactno,
					p_address : req.body.p_address,
					p_bmi : req.body.p_bmi,
					p_weight : req.body.p_weight,
					p_blood_p : req.body.p_blood_p,
					p_cal_in : req.body.p_cal_in
				}
				userModel.update_user(user, function(status){
					//console.log(status)
					res.redirect('/home/');
				});
			}
});



router.post('/search_doctor', (req, res)=>{
	var search = req.body.search;
    console.log("search", search)
	userModel.search_doctor(search, function(results){
        console.log("userModel.search_doctor -> results", results)
		res.json({
            results: results
		}); 
		//res.render("home/doctors2" ,{results : results})
	});
});

router.get('/delete/:id', (req, res)=>{
	userModel.getById_emp(req.params.id, function(results){
		var users ={
			emp_name : results[0].emp_name,
			c_name : results[0].c_name,
			contact_no : results[0].contact_no,
			username : results[0].username,
			password : results[0].password
		}
		//console.log(results[0].username)
		//console.log(users)
		res.render('user/delete', {users : users});
	});
});

router.post('/delete/:id', (req, res)=>{

	userModel.delete_emp(req.params.id, function(status){
		res.redirect('/home/userlist');
	});
});

module.exports = router;

