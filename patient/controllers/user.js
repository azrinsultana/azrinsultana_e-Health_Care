const express 	= require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { search } = require('./home');
const { param } = require('./home');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

const urlencodedParser  =bodyParser.urlencoded({ extended:false })

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/profile', (req, res)=>{
	res.render('user/profile');
});


router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create',urlencodedParser,[
	check('emp_name' , 'Employ Name must be 3 character')
	.exists()
	.isLength({min : 3}),
	check('c_name' , 'Company Name must be 1 character')
	.exists()
	.isLength({min : 3}),
	check('contact_no' , 'Contact number must be 11 character')
	.exists()
	.isLength({min : 11}),
	check('username' , 'User Name must be 3 character')
	.exists()
	.isLength({min : 3}),
	check('password' , 'Password must be 3 character')
	.exists()
	.isLength({min : 8}),
], (req, res)=>{
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return res.status(422).jsonp(errors.array())
			}
			else{
				var user = {
					emp_name : req.body.emp_name,
					c_name : req.body.c_name,
					contact_no : req.body.contact_no,
					username : req.body.username,
					password : req.body.password
				}
				 userModel.insert_emp(user, function(status){
					//console.log(status)
					res.redirect('/home/userlist');
				});
			}
			


});

router.get('/search_user', (req, res)=>{
		res.render('home/search_user');

});
router.post('/search_user', (req, res)=>{
		var search = req.body.search
		console.log(search)

	 userModel.search_emp(search, function(results){

		console.log(results)
		var users={
			emp_name : results[0].emp_name ,
			c_name : results[0].c_name ,
			contact_no : results[0].contact_no ,
			username : results[0].username ,
			password : results[0].password 
		}
		res.json({users : users});
	});

});


router.get('/edit/:id', (req, res)=>{
	
	userModel.getById_emp(req.params.id, function(results){
		var users ={
			emp_name : results[0].emp_name,
			c_name : results[0].c_name,
			contact_no : results[0].contact_no,
			username : results[0].username,
			password : results[0].password
		}
		//console.log(results)
		res.render('user/edit', {users: users});
	});
});

router.post('/edit/:id', urlencodedParser,[
	check('emp_name' , 'Employ Name must be 3 character')
	.exists()
	.isLength({min : 3}),
	check('c_name' , 'Company Name must be 1 character')
	.exists()
	.isLength({min : 3}),
	check('contact_no' , 'Contact number must be 11 character')
	.exists()
	.isLength({min : 11}),
	check('username' , 'User Name must be 3 character')
	.exists()
	.isLength({min : 3}),
	check('password' , 'Password must be 8 character')
	.exists()
	.isLength({min : 8}),
], (req, res)=>{
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return res.status(422).jsonp(errors.array())
			}
			else{
				var user = {
					id: req.params.id,
					emp_name : req.body.emp_name,
					c_name : req.body.c_name,
					contact_no : req.body.contact_no,
					username : req.body.username,
					password : req.body.password
				}
				userModel.update_emp(user, function(status){
					//console.log(status)
					res.redirect('/home/userlist');
				});
			}
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

