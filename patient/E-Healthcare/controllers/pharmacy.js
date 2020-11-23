const express 		= require('express');
const userModel		= require.main.require('./models/patient_userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
    userModel.getAll_medicine(function(results){
    console.log("userModel.getAll_medicine -> results", results)
        
        res.render('pharmacy/index',{medicine: results});
	});
});

router.post('/', (req, res)=>{

}); 
router.post('/search_medicine', (req, res)=>{
	var search = req.body.search;
	userModel.search_medicine(search, function(results){
        console.log("userModel.search_doctor -> results", results)
		res.json({
            results: results
		}); 
	});
});

module.exports = router;