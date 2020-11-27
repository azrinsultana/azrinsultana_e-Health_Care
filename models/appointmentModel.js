const db = require('./db');

module.exports= {

	
	getById: function(id, callback){
		
var sql="select * from appointmenttable where id='"+id+"'";
db.getResults(sql, function(results){
	if(results.length >0 ){
		
		callback(results);
		
	}else{
		console.log("not found");
	}
});

	},
	
	getAll: function(callback){
	
		var sql = "select name from consulting";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	
	getAllApp: function(callback){
	
		var sql = "select * from appointmenttable";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	
	
	getName: function(callback){
	
		var sql = "select * from appointmenttable";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},

	getAllname: function(callback){
	
		var sql = "select patientname from consulting";
		db.getResults(sql, function(results){

			if(results.length>0){
			callback(results);
			console.log("print name");
			console.log(results);
			}
			else{
				console.log("not found");
			}
			
		});
	},


	getAllpatient: function(callback){
	
		var sql = "select * from patient_info";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	 
	getAllconsulting: function(callback){
	
		var sql = "select * from consulting where doctorid='d002'";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	}, 

	getAllconsultingDse: function(callback){
	
		var sql = "select * from consulting where doctorid='d002' order by date DESC limit 5";
		db.getResults(sql, function(results){
			callback(results);
			console.log("result");
			console.log(results);
			
		});
	}, 

	getAllPayment: function(callback){
	
		var sql = "select * from payment where status='1'";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	}, 
	getTotalPayment: function(callback){
	
		var sql = "SELECT SUM(fee) as fee,id From payment where status='1'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
			
		});
	}, 
	insert: function(appointment, callback){
	
		var sql = "INSERT INTO appointmenttable (username,doctorname,day,starttime,endtime) VALUES ('"+appointment.username+"', '"+appointment.name+"','"+appointment.day+"','"+appointment.starttime+"','"+appointment.endtime+"')";

		db.execute(sql, function(status){
            
            callback(status);
        
		});
    },
    
	update:function(appointment, callback){
var sql="UPDATE appointmenttable SET id='"+appointment.id+"', username='"+appointment.username+"',doctorname='"+appointment.name+"',day='"+appointment.day+"',starttime='"+appointment.starttime+"',endtime='"+appointment.endtime+"' WHERE id='"+appointment.id+"' ";

db.execute(sql, function(status){
	callback(status);
});
	},

	delete: function(id, callback){
var sql="DELETE FROM appointmenttable WHERE id='"+id+"'";	

		db.execute(sql, function(status){
			callback(status);
		});
    }
    
	
}
