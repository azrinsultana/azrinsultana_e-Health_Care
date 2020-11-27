const express 		= require('express');
const mysql 	= require('mysql');
const {check,validationResult}=require('express-validator');
const doctorModel		= require.main.require('./models/doctorModel');
const userModel = require.main.require('./models/userModel');

const appointmentModel = require.main.require('./models/appointmentModel');
const  withdrawModel= require.main.require('./models/withdrawModel');
const blogModel = require.main.require('./models/blogModel');
const router 		= express.Router();

var ses;

router.get('/', (req, res)=>{
	
	res.render('login/index');
});

router.post('/',[
    check('username').not().isEmpty().withMessage('Username can not be empty'),
     check('password').not().isEmpty().withMessage('Password can not be empty'),
    
 ], (req, res)=>{

	const errors=validationResult(req)

if(!errors.isEmpty())
{
const evalue=errors.array();
   console.log(evalue);
  

    res.render('login/index',{evalue});

  // res.render('ddashboard/editschedule',{evalue});
}
else{
	
	var doctor = {

		username: req.body.username,
		password: req.body.password
	};

	

	doctorModel.validate(doctor, function(results){
		if((results[0].username==req.body.username)&& (results[0].password==req.body.password)){
			{ 
            res.cookie('uname', req.body.username);

			req.session.username=results[0].username;
			
			appointmentModel.getAllconsultingDse(function(convalue){
				if(convalue.length>0){

					appointmentModel.getAllconsulting(function(value){
						if(value.length>0){
							total=value.length;
							var user=req.session.username
withdrawModel.getByUservalue(user,function(totalresults){
	if(totalresults.length>0){
		var totalwithdraw=totalresults.length


				res.render('ddashboard/index',{doctor:results,appointment:convalue,totalvalue:total,totalwithdraw});
	}
			});
						}
			});
				}
			});
               
			}
		


			//res.render('user/userlist');
		}
		else{
			res.redirect('/login');
		}
    });
}
	
}); 








module.exports = router;