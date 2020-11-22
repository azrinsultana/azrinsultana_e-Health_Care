const express 	= require('express');
//const { param } = require('./home');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();
const urlencodedParser  =bodyParser.urlencoded({ extended:false })



router.get('/', (req, res)=>{
	res.render('user/register');
});
router.post('/check_email', (req, res)=>{
	var email = req.body.email;
    console.log("email", email)
	userModel.check_email(email, function(results){
        console.log("userModel.check_email -> results", results)
		res.json({
            results: results
		}); 
		//res.render("home/doctors2" ,{results : results})
	});
});


router.post('/' 
, urlencodedParser,[
	check('username' , 'username must be 4 character')
	.exists()
	.isLength({min : 4}),
	check('fullname' , 'fullname must be 4 character')
	.exists()
	.isLength({min : 4}),
	check('email' , 'Email cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('password' , 'password  must be 8 character')
	.exists()
	.isLength({min : 8}),
	check('contactno' , 'Contact number must be 11 character')
	.exists()
	.isLength({min : 1}),
	check('p_birth_date' , 'Date of Birth cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('p_address' , 'Address  must be 5 character')
	.exists()
	.isLength({min : 5}),
	check('p_blood_group' , 'Blood Group cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('p_bmi' , 'BMI cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('p_weight' , 'wWeight cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('p_blood_p' , 'Blood Presure cannot be Empty')
	.exists(),
	check('p_cal_in' , 'Calorie Intake cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('photo' , 'Photo cannot be Empty')
	.exists()
	.isLength({min : 1}),
] 
, (req, res)=>{
	const errors = validationResult(req)
			if(!errors.isEmpty()){
				//return res.status(422).jsonp(errors.array())
				const alert = errors.array()
				res.render('user/register' , {alert});
			}
			else{ 
				var user = {				
							username: req.body.username,
							fullname: req.body.fullname,
							email: req.body.email,
							password: req.body.password,
							contactno: req.body.contactno,
							p_birth_date: req.body.p_birth_date,
							p_address: req.body.p_address,
							p_blood_group: req.body.p_blood_group,
							p_bmi: req.body.p_bmi,
							p_weight: req.body.p_weight,
							p_blood_p: req.body.p_blood_p,
							p_cal_in: req.body.p_cal_in,
							photo: req.body.file
							}
				userModel.insert_user(user, function(status){
					res.redirect('/login');
				});
		}

});


module.exports = router;

