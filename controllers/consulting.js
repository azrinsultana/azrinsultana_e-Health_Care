const express 	= require('express');
const doctorModel = require.main.require('./models/doctorModel');
const appointmentModel = require.main.require('./models/appointmentModel');
const blogModel = require.main.require('./models/blogModel');
const {check,validationResult}=require('express-validator');

const router 	= express.Router();

router.get('*',  (req, res, next)=>{

	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}

});


router.get('/allappointment',  (req, res, next)=>{

	if(req.cookies['uname'] != null){
        appointmentModel.getAllpatient(function(results){
            if(results.length>0){
               console.log(results);
                appointmentModel.getAllconsulting(function(value){
                    if(value.length>0){
                       
                       console.log(value);
                      
                     
                        res.render('consulting/allappointment',{patient:results,consulting:value});
                        
                    
                    }
                //res.render('consulting/allappointment');
                });
             
               // res.render('consulting/allappointment',{patient:results});
                
            
            }
        //res.render('consulting/allappointment');
        });
	}else{
		res.redirect('/login');
	}

});
module.exports = router;