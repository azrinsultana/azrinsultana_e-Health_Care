const { json } = require('body-parser');
const express 	= require('express');
//const { check, validationResult } = require('express-validator');
const doctorModel = require.main.require('./models/doctorModel');
const  withdrawModel= require.main.require('./models/withdrawModel');
const appointmentModel = require.main.require('./models/appointmentModel');
const usertModel = require.main.require('./models/userModel');
const {check,validationResult}=require('express-validator');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{

	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}

});

router.get('/index', (req, res)=>{


    res.render('ddashboard/index');
});
router.get('/profile', (req, res)=>{
    var username=req.session.username;
    doctorModel.getById(username, function(results){
	
	
		if(results.length>0){
            var doctor=results;
           var doctorjson= JSON.stringify(doctor);

			res.render('ddashboard/profile',{doctorjson});
			
		
		}
	
		else{
			res.redirect('/login');
		}
  //  res.render('ddashboard/profile');
    });

});

///////////////////////////////////
//////ajax code/////////////////

router.post('/search', (req, res)=>{
    console.log("print");
    var username=req.session.username;
    appointmentModel.getAllname(function(results){
        if(results.length>0){

            var data = [];
            for (i = 0; i < rows.length; i++)
            {
                data.push(rows[i].fullname);
            }
            res.send(JSON.stringify(data));
        }
    
           
             });

          });

        
///////////////////////////////////
//////ajax code/////////////////
router.get('/edit', (req, res)=>{

    var username=req.session.username;
    doctorModel.getById(username, function(results){
	
	
		if(results.length>0){

    res.render('ddashboard/edit',{doctor:results});
        }
    });
});

router.post('/edit',[ 
check('name').not().isEmpty().withMessage('Name can not be empty'),
check('password').not().isEmpty().withMessage('Password can not be empty'),
check('address').not().isEmpty().withMessage('Address can not be empty'),
check('email').not().isEmpty().withMessage('Enter email'),
check('qualification').not().isEmpty().withMessage('Enter qualification'),
check('specalist').not().isEmpty().withMessage('specalist field not be empty'),
check('fee').not().isEmpty().withMessage('Enter fee'), ],
(req, res)=>{const errors=validationResult(req)

    if(!errors.isEmpty())
    {
    const evalue=errors.array();
       console.log(evalue);
       doctorModel.getById(username, function(results){
	
	
        if(results.length>0){    

res.render('ddashboard/edit',{evalue},{doctor:results});
        }
    });
       
    }
      
    else{

    var username=req.session.username;
    var doctor={
username,
name:req.body.name,
password:req.body.password,
address:req.body.address,
email:req.body.email,
contactno:req.body.contactno,
qualification:req.body.qualification,
specalist:req.body.specalist,
fee:req.body.fee

    };
    doctorModel.update(doctor, function(status){
	
	
		if(status){
            doctorModel.getById(username, function(results){
	
	
                if(results.length>0){ 
                    var doctor=results;
                    var doctorjson=JSON.stringify(doctor);    

    res.render('ddashboard/profile',{doctorjson});
                }
            });
        }
    });
}
});


/*

app.get('/search',function(req,res){
    appointmentModel.getName(function(results){
    
    if(results.length>0){
         
        var data=[];
        for(i=0;i<rows.length;i++)
          {
            data.push(rows[i].first_name);
          }
          res.end(JSON.stringify(data));
        }
        });
    });
    
*/
router.get('/view', (req, res)=>{
    var username=req.session.username;
    
    appointmentModel.getAllApp(function(results){
        if(results.length>0){
               var appointment=results;
               var appointmentjson=JSON.stringify(appointment) ;
             
             
                res.render('ddashboard/schedule',{appointmentjson});
                
            }else{
                res.redirect('/login');
            }
        });
    
    
   
});

router.post('/view', (req, res)=>{
    var username=req.session.username;
   // res.redirect('ddashboard/schedule');
    console.log("view");
   
    appointmentModel.getAll(function(results){
            if(results.length>0){
               
                res.redirect('ddashboard/schedule');
             
                //res.render('ddashboard/schedule',{appointment:results});
                
            }else{
                res.redirect('/login');
            }
        });
    
    
   
});


router.get('/addschedule', (req, res)=>{
    res.render('ddashboard/addschedule',{success:false,errors:req.session.errors});
    req.session.errors=null;
});

 
router.post('/addschedule',[
   check('d_name').not().isEmpty().withMessage('Field can not be empty'),
    check('d_day').not().isEmpty().withMessage('Day can not be empty'),
    check('d_starttime').not().isEmpty().withMessage('Enter start time'),
    check('d_endtime').not().isEmpty().withMessage('Enter start time'),
   
],(req, res)=>{

const errors=validationResult(req)

if(!errors.isEmpty())
{
const evalue=errors.array();
   console.log(evalue);
   res.render('ddashboard/addschedule',{evalue});
}
  
else{
    
    var username=req.session.username;
    console.log(username);
    var appointment={
      username,
      name:req.body.d_name,
      day:req.body.d_day,
      starttime:req.body.d_starttime,
      endtime:req.body.d_endtime

    };
  
    appointmentModel.insert(appointment, function(status){
		
		if(status){
        
    
			appointmentModel.getAllApp(function(results){

				res.render('ddashboard/schedule', {appointment: results});
			});
		}else{
			res.redirect('/login');
		}
    });
}
	
});

router.get('/editschedule/:id', (req, res)=>{
    var id=req.params.id;
    appointmentModel.getById(id, function(results){
	
	
		if(results.length>0){
			

			res.render('ddashboard/editschedule',{appointment:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		
	}); 
   
});

router.post('/editschedule/:id',[
    check('d_name').not().isEmpty().withMessage('Field can not be empty'),
     check('d_day').not().isEmpty().withMessage('Day can not be empty'),
     check('d_starttime').not().isEmpty().withMessage('Enter start time'),
     check('d_endtime').not().isEmpty().withMessage('Enter start time'),
    
 ],

 (req, res)=>{
    const errors=validationResult(req)

if(!errors.isEmpty())
{
const evalue=errors.array();
   console.log(evalue);
   appointmentModel.getAllApp(function(results){

    res.render('ddashboard/editschedule',{evalue}, {appointment: results});
});
  // res.render('ddashboard/editschedule',{evalue});
}
else{


   
var day=req.body.d_day;
     var appointment={
        username:req.session.username,
        id:req.params.id,
        name:req.body.d_name,
       day,
        starttime:req.body.d_starttime,
        endtime:req.body.d_endtime

    };

  console.log(appointment);
	appointmentModel.update(appointment, function(status){
		if(status){
           
			appointmentModel.getAllApp(function(results){

				res.render('ddashboard/schedule', {appointment:results});
			}); 
            

		}else{
		//	res.render('user/update');
		}
	});
}
   
});

router.get('/deleteschedule/:id', (req, res)=>{
    var id=req.params.id;
    appointmentModel.getById(id, function(results){
	
	
		if(results.length>0){
			

			res.render('ddashboard/deleteschedule',{appointment:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		
	}); 
   
});
   // res.render('ddashboard/addschedule');

   router.post('/deleteschedule/:id', (req, res)=>{
    var id=req.params.id;
    appointmentModel.delete(id, function(status){
	
	
		if(status){
			
            appointmentModel.getAllApp(function(results){

				res.render('ddashboard/schedule', {appointment:results});
			}); 
            
		//	res.render('ddashboard/deleteschedule');
			
		
		}
	
		else{
			res.redirect('/login');
		}
		
	}); 
   
});

router.get('/paymentlist', (req, res)=>{
   
   
    
    appointmentModel.getAllPayment(function(results){
	console.log("pament");
	console.log(results);
		
    appointmentModel.getTotalPayment(function(value){
        //console.log("pament");
        //console.log(results);
            console.log(value);

            totalPayment=value;
          //  var totalpaymentjson=JSON.stringify(totalPayment) 
            console.log(totalPayment)
    
        res.render('payment/paymentlist', {payment:results,totalPayment});
        
        }); 
    //res.render('payment/paymentlist', {payment:results});
	
    }); 
    
   
});

router.get('/withdraw', (req, res)=>{
    var username=req.session.username;
   
    appointmentModel.getTotalPayment(function(value){
       
        doctorModel.getById(username, function(results){
	
	
            if(results.length>0){
                
    
                res.render('payment/withdraw', {totalPayment:value,doctor:results});
                
            
            }
        
        
        }); 
           
       // res.render('payment/withdraw', {totalPayment:value});
        
        }); 
    //res.render('payment/paymentlist', {payment:results});
	
   
   
});

router.post('/withdraw', [
    check('poption').not().isEmpty().withMessage('Select a payment option'),
     check('amount').not().isEmpty().withMessage('Enter amount'),
     
    
 ],

 (req, res)=>{
    const errors=validationResult(req)

if(!errors.isEmpty())
{
const evalue=errors.array();
   console.log(evalue);
   appointmentModel.getAllApp(function(results){

    var username=req.session.username;
   
    appointmentModel.getTotalPayment(function(value){
       
        doctorModel.getById(username, function(results){
	
	
            if(results.length>0){
                
    
                res.render('payment/withdraw', {evalue,totalPayment:value,doctor:results});
                
            
            }
        
        
        }); 
           
       // res.render('payment/withdraw', {totalPayment:value});
        
        }); 
    //res.render('payment/paymentlist', {payment:results});
	
   
});
  // res.render('ddashboard/editschedule',{evalue});
}
else{
    
   var username=req.session.username;
    
       
        doctorModel.getById(username, function(results){
	
	
            if(results.length>0){
                var username=results[0].username;
                var name=results[0].name;
                console.log(name);
                var email=results[0].email;
                var contactno=results[0].contactno;
                var specalist=results[0].specalist;
                var qualification =results[0].qualification;

            
            appointmentModel.getTotalPayment(function(value){
       
              
                        var totalmoney=value[0].fee;
                
        
           
        var paymentoption=req.body.poption;
        var  withdrawamount =req.body.amount;
        console.log("before id");
        withdrawModel.getAll(function(results){
	
	
            if(results.length>0){
               var id= results[0].id;
    console.log("last id");
    console.log(results);
              console.log(id);
              withdrawModel.getById(id,function(results){
                var netamount=results[0].netamount;
                console.log(netamount);
            
           var netmoney=netamount-withdrawamount;
           
       
var incid=id+1;
     
       var withdraw={incid,username,name,email,contactno,specalist,qualification,totalmoney,paymentoption,withdrawamount,netmoney};
console.log("withdraw");
        console.log(withdraw);
        withdrawModel.insert(withdraw, function(status){
		
            if(status){

            withdrawModel.getByUser(withdraw,function(results){
                if(results.length>0){

console.log(results);

               
                res.render('payment/withdrawslip',{withdrawslip:results});
                }
        });
            }
        
        });
    
    });
    }
        
        
}); 
   
}); 
        }
        
    }); 
}
   
});


module.exports = router;