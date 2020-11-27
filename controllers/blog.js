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




router.post('/search', (req, res)=>{
	var keyword=req.body.keyword;

	console.log(keyword);
	blogModel.getsearch(keyword,function(results){
		console.log(results);
		res.json(results);


	});
  //  res.render('blog/bloglist');
});




router.get('/bloglist', (req, res)=>{
	blogModel.getAll(function(results){

		res.render('blog/bloglist',{blog:results});
	});
  //  res.render('blog/bloglist');
});

router.get('/blogview/:blog_id', (req, res)=>{
	var id=req.params.blog_id;
	console.log(id);
	blogModel.getById(id, function(results){
	
	
		if(results.length>0){
			

			res.render('blog/blogview',{blog:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		

   
});
	
   // res.render('blog/blogview');
});

router.get('/blogadd', (req, res)=>{
    res.render('blog/blogadd');
});

router.post('/blogadd',[ 
	check('blogname').not().isEmpty().withMessage('Title can not be empty'),
check('catagory').not().isEmpty().withMessage('Enter correct catagory'),
check('blogdes').not().isEmpty().withMessage('Field can not be empty'),

//check('d_endtime').not().isEmpty().withMessage('Enter start time'),
],

(req, res)=>{
	const errors=validationResult(req)

	if(!errors.isEmpty())
	{
	const evalue=errors.array();
	   console.log(evalue);
	   
	
		res.render('blog/blogadd',{evalue});

}
	else{
	var userid=req.session.username;
	var blog={
		userid,
	  title:req.body.blogname,
	  catagory:req.body.catagory,
	  details:req.body.blogdes

	  
	};
	console.log(blog);
	blogModel.insert(blog, function(status){
		
		if(status){
        
    
			blogModel.getAll(function(results){
				//var blog=results;
				//console.log(blog);
                   
				res.render('blog/bloglist',{blog:results});
			});
		}else{
			res.redirect('/login');
		}
	});
	}
   // res.render('blog/blogadd');
});
router.get('/blogedit/:blog_id', (req, res)=>{
	var id=req.params.blog_id;
	console.log(id);
	blogModel.getById(id, function(results){
	
	
		if(results.length>0){
			

			res.render('blog/blogedit',{blog:results});
			
		
		}
	
		else{
			res.redirect('/login');
		}
		

   
});
    //res.render('blog/blogedit');
});

router.post('/blogedit/:blog_id', (req, res)=>{
	var id=req.params.blog_id;
	//var userid=req.session.username;
	var blog={
		id,
	  title:req.body.blogname,
	  catagory:req.body.catagory,
	  details:req.body.blogdes

	  
	};
	
	blogModel.update(blog, function(status){
		if(status){
           
			blogModel.getAll(function(results){

				res.render('blog/bloglist', {blog:results});
			}); 
            

		}else{
		//	res.render('user/update');
		}
	});
    //res.render('blog/blogedit');
});
module.exports = router;