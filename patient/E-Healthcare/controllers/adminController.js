const express   = require('express');
const userModel = require('../models/userModel');
const blogModel = require('../models/a_blogModel');
const patientModel = require('../models/a_patientModel');
var easyinvoice = require('easyinvoice');
const fs        = require('fs');
//const bodyParser 		= require('body-parser');
const {check,validationResult} = require('express-validator');
const bodyParser = require('body-parser'); 
const urlencodedParser = bodyParser.urlencoded({extended:false});

const router    = express.Router();

var ms =   '';

//const { check, validationResult } = require('express-validator');

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
}); 



//routing paths
router.get('/',(req,res)=>{

    var a='';

var b='';

var c='';

var d='';


userModel.getPatients(function(results1){
    b=results1.length;
    //var a = results.length;
    userModel.getConsulting(function(results3){
        cr=results3.length;

    userModel.getDoctors(function(results2){
        console.log(results2.length);
        c=req.cookies['uname'];
       
         a = results2.length;

         
         
        res.render('admin/index',{total:a, patient:b,uname:c ,consult:cr});
       
    });
    

});
  

});
   
});


router.get('/doctors',(req,res)=>{
    var c='';
    userModel.getDoctors(function(results){
        c=req.cookies['uname'];
       
    res.render('admin/a_doctors',{doctors:results,total:results.length,uname:c});
    });
    
});
router.post('/doctors/search_doctor',(req,res)=>{
    var search = req.body.search;
	userModel.search_doctor(search, function(results){
        console.log("userModel.search_doctor -> results", results)
		res.json({
            results: results
		}); 
});
});

router.get('/patients',(req,res)=>{
    var c='';
    userModel.getPatients(function(results){
        c=req.cookies['uname'];
        
    res.render('admin/patients',{patients:results,total:results.length,uname:c});
    });
   // res.render('admin/patients');
});

router.get('/patients/add',(req,res)=>{
    res.render('admin/createpatients');
});

router.get('/patients/edit/:id',(req,res)=>{
    var patient = {id:req.params.id};
    userModel.getAll_patient(patient,function(results){
       
        console.log("check all ->",results);
       // var c  = results;
    res.render('admin/editpatients',{ patients:results });
    });

   // res.render('admin/editdoctor');
});

router.get('/profile',(req,res)=>{
    console.log('idddddddd',req.cookies['id']);
    var profile={id:req.cookies['id']}
    userModel.getByemail(profile,function(results){
        res.render('admin/profile',{profiles:results});
    })


    
   
});
router.get('/payment',(req,res)=>{
    userModel.getAllPayment(function(results){
        //console.log(results.length);
    res.render('admin/payment',{payment:results});
    });
   
});
router.get('/servicerequest',(req,res)=>{

    userModel.getAllService(function(results){
        //console.log(results.length);
    res.render('admin/servicerequest',{services:results});
    });


    
});
router.get('/servicerequest/add',(req,res)=>{
    res.render('admin/createservice');
});

router.post('/servicerequest/add',(req,res)=>{

    var service={
        name:req.body.name,
        price:req.body.fee
    }
    userModel.insertService(service,function(status){
        if(status){
            res.redirect('/admin/servicerequest');
        }
    
    })

   
});



router.get('/blog',(req,res)=>{
    blogModel.getAll(function(results){
        //console.log(results.length);
    res.render('admin/blog',{blog:results});
    });
   
});
router.get('/admins',(req,res)=>{
    userModel.getAllAdmin(function(results){
        //console.log(results.length);
    res.render('admin/admins',{admin:results});
    });
   
});
router.get('/admins/add',(req,res)=>{
    res.render('admin/createadmin');
});

router.get('/doctors/add',(req,res)=>{
    res.render('admin/createdoctor');
});

router.get('/doctors/edit/:id',(req,res)=>{
    var doctor = {id:req.params.id};
    userModel.getAll_doctor(doctor,function(results){
       
       // var c  = results;
    res.render('admin/editdoctor',{doctors:results});
    });

   // res.render('admin/editdoctor');
});
/*router.get('/doctors/delete/:id',(req,res)=>{
    var a= ""
    res.render('admin/deletedoctor',a);
});*/
router.get('/blog/add',(req,res)=>{
    res.render('admin/createblogpost');
});

router.get('/admins/edit/:id',(req,res)=>{
    var admin = {id:req.params.id};
    userModel.getAdminById(admin,function(results){
       
        var c  = results;
    res.render('admin/editadmin',{admins:c});
    });
   // res.render('admin/patients');
});



router.post('/admins/edit/:id',(req,res)=>{
    var admin = {username:req.body.username,
        id:req.body.id,
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
        type:'admin',                
        //fee:req.body.fee,
        //qualification:req.body.qualification,
        //about:req.body.about,
        //dob:req.body.dob,

        //photo:filename,
        contactno:req.body.contactno};
                            userModel.update(admin,function(status){
                                if(status){
                                    res.redirect('/admin/admins');
                
                                }
                            
                                else{
                                    res.redirect('admin/admins/add');
                                }
                            });
                        
                 
        


    //res.render('admin/editadmin');
});





//post methods

//Doctor

router.post('/doctors/add',urlencodedParser,[
    check('username',' username must be filled up').exists().isLength({min:2}),
    check('email','Email must be filled up').exists().isLength({min:2}),
    check('password','Password must be filled up').exists().isLength({min:2}),
    check('fullname','Fullname must be filled up').exists().isLength({min:2}),
    check('contactno','Email must be filled up').exists().isLength({min:2})
],

(req,res)=>{

    var doctor = {username:req.body.username,
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
        type:'doctor',                
        fee:req.body.fee,
        qualification:req.body.qualification,
        about:req.body.about,
        dob:req.body.dob,

        //photo:filename,
        contactno:req.body.contactno};

    var errors= validationResult(req);
    if(!errors.isEmpty()){
        const alert = errors.array();
        res.render('admin/createdoctor',{
            alert
        });
    }
  
      else{

            userModel.validate(doctor,function(status){
                if(status){
                    //alert("user exists");
                    //ms = "duplicate"
                    //res.send('duplicate');
                   
                    res.render('admin/createdoctor',{mss:"exists"})
                }else{

              
               userModel.insert(doctor,function(status){
                                if(status){
                                    res.redirect('/admin/doctors');
                
                                }
                            
                                else{
                                    res.redirect('admin/doctors/add');
                                }
                            });

                                  
                }
            });

                        }
                 
        
});
//doc delete
router.get('/doctors/delete/:id',(req,res)=>{
    var doctor = {id:req.params.id}
    //console.log("dddd:",doctor);
    userModel.delete(doctor,function(status){
        if(status){
            res.redirect('/admin/doctors');
        } else{
            res.redirect('admin/doctors/add');
        }
    });
});



    


//patients

router.post('/patients/add',urlencodedParser,[
    check('username',' username must be filled').exists().isLength({min:2}),
    check('email','Email must be filled up').exists().isLength({min:2}),
    check('password','Password must be at least 5 digit').exists().isLength({min:5}),
    check('fullname','Fullname must be filled up').exists().isLength({min:2}),
    check('contactno','Email must be filled up').exists().isLength({min:2})
],(req,res)=>{
    var patient = {  username:req.body.username,
                    fullname:req.body.fullname,
                    email:req.body.email,
                    password:req.body.password,
                    type:'patient',                
                    address:req.body.address,
                    dob:req.body.dob,
                    bmi:req.body.bmi,
                    bp:req.body.bp,
                    weight:req.body.weight,
                    bg:req.body.bg,
                    cal:req.body.cal,
                    //photo:filename,
                    contactno:req.body.contactno};

                    
    var errors= validationResult(req);
    if(!errors.isEmpty()){
        const alert = errors.array();
        res.render('admin/createpatients',{
            alert
        });
    } else{

            patientModel.insert(patient,function(status){
				if(status){
					res.redirect('/admin/patients');

				}
				else{
					res.redirect('admin/patients/add');
				}
            });}

});
//patient deltete
router.get('/patients/delete/:id',(req,res)=>{
    var doctor = {id:req.params.id}
    //console.log("dddd:",doctor);
    patientModel.delete(doctor,function(status){
        if(status){
            res.redirect('/admin/patients');
        } 
    });
});





//Blog
router.post('/blog/add',(req,res)=>{


    var blog = {title:req.body.title,
                details:req.body.details,
                id:"",
                photo:"",
                time:time()
                            
            };


console.log(blog);

blogModel.insert(blog,function(status){
    if(status){
        res.redirect('/admin/blog');

    }
    
});
});

//blog delete/*
router.get('/blog/delete/:id',(req,res)=>{
    var blog = {id:req.params.id}
    //console.log("dddd:",doctor);
    blogModel.delete(blog,function(status){
        if(status){
            res.redirect('/admin/blog');
        } 
    });
});


//admin
router.post('/admins/add',urlencodedParser,[
    check('username',' username must be filled up').exists().isLength({min:2}),
    check('email','Email must be filled up').exists().isLength({min:2}),
    check('password','Password must be filled up').exists().isLength({min:2}),
    check('fullname','Fullname must be filled up').exists().isLength({min:2}),
    check('contactno','Email must be filled up').exists().isLength({min:2})
],

(req,res)=>{

    var admin = {username:req.body.username,
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
        type:'admin',                
        //fee:req.body.fee,
        //qualification:req.body.qualification,
        //about:req.body.about,
        //dob:req.body.dob,

        //photo:filename,
        contactno:req.body.contactno};

    var errors= validationResult(req);
    if(!errors.isEmpty()){
        const alert = errors.array();
        res.render('admin/createadmin',{
            alert
        });
    }
  
      else{

                        
                   
                            userModel.insertAdmin(admin,function(status){
                                if(status){
                                    res.redirect('/admin/admins');
                
                                }
                            
                                else{
                                    res.redirect('admin/admins/add');
                                }
                            });
                        }
                 
        
});

router.get('/admins/delete/:id',(req,res)=>{
    var admin = {id:req.params.id}
    //console.log("dddd:",doctor);
    userModel.deleteAdmin(admin,function(status){
        if(status){
            res.redirect('/admin/admins');
        } 
    });
});




router.get('/payment/print/:id',(req,res)=>{

    var payid = {id:req.params.id}
    
    userModel.getPaymentById(payid,function(results){
       
        var c  = results;
    res.render('admin/printpayment',{payment:c});
    });


   // res.render('admin/printpayment');

})

//consulting

router.get('/consultingrequest',(req,res)=>{

   
    
    userModel.getConsulting(function(results){
       
        var x=results;
      
        res.render('admin/consultingrequest',{consulting:x});
    });


   // res.render('admin/printpayment');

})

router.post('/doctors/add/check_email', (req, res)=>{
	var username = req.body.username;
    console.log("email", username)
	userModel.check_username(username, function(results){
        console.log("userModel.check_email -> results", results)
		res.json({
            results: results
		}); 
		//res.render("home/doctors2" ,{results : results})
	});
});









module.exports = router;