 
const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0].type);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},

	getDoctors: function(callback){
		var sql = "select * from users where type='patient'";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},

	getPatients: function(callback){
		var sql = "select * from users where type='patient'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},





	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(patient, callback){
		var sql = "INSERT INTO users(fullname,username,email,password,type,photo,contactno) VALUES ('"+patient.fullname+"','"+patient.username+"','"+patient.email+"','"+patient.password+"','"+patient.type+"','"+patient.photo+"','"+patient.contactno+"')";
		
		db.getResults(sql,function(results){
			console.log("abc :",results.insertId);
			var sql2 = "INSERT INTO patient_info(p_birth_date,p_address,p_blood_group,p_bmi,p_weight,p_blood_p,p_cal_in,user_id) VALUES ('"+patient.dob+"','"+patient.address+"','"+patient.bg+"','"+patient.bmi+"','"+patient.weight+"','"+patient.bp+"','"+patient.cal+"','"+results.insertId+"')";
			db.getResults(sql2,function(results){
			callback(results);
			//abc = status.insertId;
			//console.log("abc :",abc);
			});
		});
	},
	
	update: function(user, callback){
		console.log(user);
		var sql = "update users set username = '"+user.username+"',email = '"+user.email+"', password = '"+user.password+"',companyname = '"+user.companyname+"',contactno = '"+user.contactno+"' where id = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(patient, callback){
		var sql = "DELETE FROM users WHERE user_id = '"+patient.id+"'";
		//var sql2 = "DELETE FROM doctor_table WHERE user_id = '"+doctor.id+"'";
		//sql = {sql1,sql2};
		
		db.execute(sql,function(status){
		
				if(status){
					callback(true);
				}else{
					callback(false);
				}
			});
			
		
	}
}