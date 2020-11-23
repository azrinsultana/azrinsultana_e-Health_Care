const express 						= require('express');
const fs 						= require('fs');
//const { param } 					= require('./home');
const bodyParser 					= require('body-parser');
const { check, validationResult } 	= require('express-validator');
const userModel 					= require.main.require('./models/userModel');
const router 						= express.Router();
const bcrypt 						= require('bcrypt');
//const upload            			= require('express-fileupload');
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
   // callback(null, './uploads');
   var dir = "../uploads";

   if(!fs.existsSync(dir)){
		fs.mkdirSync(dir);
   }
	   callback(null , dir);
	   
  },

  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single("file");

const urlencodedParser 				= bodyParser.urlencoded({ extended:false })


//router.use(upload());

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
	check('username' , 'username must be 2 character')
	.exists()
	.isLength({min : 2}),
	check('fullname' , 'fullname must be 2 character')
	.exists()
	.isLength({min : 2}),
	check('email' , 'Email cannot be Empty')
	.exists()
	.isLength({min : 1}),
	check('password' , 'password  must be 8 character')
	.exists()
	.isLength({min : 8}),
	check('contactno' , 'Contact number cannot be Empty')
	.exists()
	.isInt().withMessage('Contact number must be Number')
	.isLength({min : 11}).withMessage('Contact number must be 11 character'),
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
	.isLength({min : 1})
	.isInt().withMessage('BMI must be Number'),
	check('p_weight' , 'Weight cannot be Empty')
	.exists()
	.isLength({min : 1})
	.isInt().withMessage('Weight must be Number'),
	check('p_blood_p' , 'Blood Presure cannot be Empty')
	.exists(),
	check('p_cal_in' , 'Calorie Intake cannot be Empty')
	.exists()
	.isLength({min : 1})
	.isInt().withMessage('Calorie Intake must be Number')	
]
,async (req, res)=>{
	 const errors = validationResult(req)
			if(!errors.isEmpty()){
				//return res.status(422).jsonp(errors.array())
				const alert = errors.array()
				res.render('user/register' , {alert});
			}
			else{  
				upload(req,res,function(err) {
					if(err) {
						return res.end("Error uploading file.");
					}
					res.end("File is uploaded");
				});

				 var user = {				
							username: req.body.username,
							fullname: req.body.fullname,
							email: req.body.email,
							password: await bcrypt.hash(req.body.password , 10),
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

