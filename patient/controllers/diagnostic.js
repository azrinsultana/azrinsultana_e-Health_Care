const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
    userModel.getAll_diagnostic(function(results){
    //console.log("userModel.getAll_diagnostic -> results", results)
		userModel.getAll_checkups(function(results2){

			res.render('home/diagnostic',{diagnostic: results, checkups:results2});
		});
	});
});

router.post('/', (req, res)=>{

}); 


module.exports = router;