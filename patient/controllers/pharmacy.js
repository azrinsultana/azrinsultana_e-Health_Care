const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
    userModel.getAll_medicine(function(results){
    console.log("userModel.getAll_medicine -> results", results)
        
        res.render('pharmacy/index',{medicine: results});
	});
});

router.post('/', (req, res)=>{


}); 

module.exports = router;