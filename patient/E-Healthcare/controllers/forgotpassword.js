const express   = require('express');
const userModel = require('../models/userModel');
const router    = express.Router();
const bodyParser = require('body-parser'); 
const nodemailer = require('nodemailer');
const exSession 		= require('express-session');
const url             = require('url');


router.get('/', (req, res)=>{
	req.session.destroy();
	res.render('forgotpassword/index');

});

router.post('/', (req, res)=>{
	var email = {email:req.body.email}
	userModel.getByEmail(email, function(results) {
        console.log('email user->',results.email);
        req.session.user_id = results.user_id;
        req.session.user_name = results.full_name;
        req.session.password = results.password;
        req.session.user_mail = results.email;
       
        console.log('xxxx->',req.session.user_mail);
        res.redirect('/forgotpassword/send-mail');

        
    });
});


router.get('/send-mail', function (req, res){

   

    var transporter = nodemailer.createTransport({ 
        //host: "www.cricybuzz.com",
        //port: 587,
        //secure: false,
        service: 'gmail',
        auth: {
            user:'mrdoncc9@gmail.com',
            pass: 'badhonbk678'
        }
    });

    var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
 var q = url.parse(adr, true);
    
    var verification_code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    req.session.verification_code = verification_code;
    var mailOptions = {
        from: 'mrdoncc9@gmail.com',
        to: req.session.user_mail,
        subject: 'Password Reset',
        text: 'To reset your password please enter the following code in the field: '+verification_code,
        //html: "<p><h4>Password Reset Request</h4> <ul><li>Name:</li><li>Name:${ req.session.user_name}</li><li>Name:</li><li>Name:${ req.session.user_name}</li></ul></p>",
    };
    
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log('msg sent failed......!!!',err);
        }else{
            console.log('Mail has been sent.....!!!'+ info.response);
        }
    });
    res.redirect('/forgotpassword/verifycode');
});



router.get('/verifycode', (req, res) => {
    if(req.session.verification_code==null || req.session.user_mail==null){
        res.redirect('/forgotpassword');
    }
    else{
        res.render('forgotpassword/verifycode', {
            user_name: req.session.user_name,
            user_id: req.session.user_id
        });
    }
});

router.post('/verifycode', function(req, res){
    if(req.session.verification_code== null || req.session.user_mail== null){
        res.redirect('/forgotpassword');
    }
    else{
        if(req.session.verification_code==req.body.verify){
            res.redirect('/forgotpassword/resetpassword');
        }
        else{
            res.send('Invalid Verification Code!');
        }
    }
});

router.get('/resetpassword', (req, res) => {
    if(req.session.user_mail==null || req.session.verification_code==null){
        res.redirect('/forgotpassword');
    }
    else{
        res.render('forgotpassword/resetpassword');
    }
});

router.post('/resetpassword', function(req, res){
    if(req.session.user_mail==null || req.session.verification_code==null){
        res.redirect('/forgotpassword');
    }
    else{
        if(req.body.password==req.body.cpassword){
            //var sql = "UPDATE users SET password='"+req.body.password+"' WHERE id='" + req.session.user_id + "'";
            user = {id:req.session.user_id,
                    password:req.body.password            
            }
            
            userModel.updatePass(user, function (callback){
                if(callback == true){
                    req.session.destroy();
                    res.redirect('/login');
                }
                else{
                    res.send('Could not reset password.....!');
                }
            });
        }
        else{
            res.send('Invalid Password!');
        }
    }
});

module.exports = router;
