const express 						= require('express');
const fs 						= require('fs');
//const { param } 					= require('./home');
const bodyParser 					= require('body-parser');
const { check, validationResult } 	= require('express-validator');
const userModel 					= require.main.require('./models/patient_userModel');
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
 
,async (req, res)=>{
	/* const errors = validationResult(req)
			if(!errors.isEmpty()){
				//return res.status(422).jsonp(errors.array())
				const alert = errors.array()
				res.render('user/register' , {alert});
			}
			else{  */
				console.log("username----" , req.body.username)
				console.log(req.files)
				upload(req,res,function(err) {
					if(err) {
						return res.end("Error uploading file.");
					}
					res.end("File is uploaded");
				});
				/* var user = {				
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
							} */
				/* userModel.insert_user(user, function(status){
					res.redirect('/login');
				}); */
		/* } */
		

});




module.exports = router;

