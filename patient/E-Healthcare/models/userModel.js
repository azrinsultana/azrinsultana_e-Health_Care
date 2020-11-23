 
const db = require('./db');

module.exports= {
	validate: function(doctor, callback){
		var sql = "select * from users where username='"+doctor.username+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	check_username: function(username, callback){
		var sql = "select * from users where username ='"+username+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getByEmail:  function(email, callback){
		var sql = "select * from users where email ='"+email.email+"'";
		db.getResults(sql, function(results){
           
			if(results.length >0 ){
				console.log("db.getResults ~ results", results)
				callback(results[0]);
			}
		});
	},


	getByemail: function(profile, callback){
		var sql = "select * from users where user_id='"+profile.id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
		
	},
	getPaymentById: function(payid, callback){
		var sql = "select * from patient_payment where p_payment_id ='"+payid.id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
		
	},

	getDoctors: function(callback){
		var sql = "select * from users where type='doctor'";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	getAll_doctor: function(doctor,callback){
		var sql = "SELECT * from doctor_table INNER JOIN users ON doctor_table.user_id=users.user_id where doctor_table.user_id='"+doctor.id+"' ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAll_patient: function(patient,callback){
		var sql = "SELECT * from patient_info INNER JOIN users ON patient_info.user_id=users.user_id where patient_info.user_id='"+patient.id+"' ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	search_doctor: function(search , callback){
		var sql = "SELECT * from users where type = 'doctor' and fullname LIKE '%"+search+"%' ";

		db.getResults(sql, function(results){
			
			callback(results);
		});},

	getPatients: function(callback){
		var sql = "select * from users where type='patient'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getConsulting: function(callback){
		var sql = "select * from consulting where status='pending'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAllService: function(callback){
		var sql = "select * from service";
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

	getAllAdmin: function(callback){
		var sql = "select * from users where type='admin'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAdminById: function(admin,callback){
		var sql = "select * from users where user_id ='"+admin.id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getAllPayment: function(callback){
		var sql = "select * from patient_payment";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(doctor, callback){
		var sql = "INSERT INTO users(fullname,username,email,password,type,photo,contactno) VALUES ('"+doctor.fullname+"','"+doctor.username+"','"+doctor.email+"','"+doctor.password+"','"+doctor.type+"','"+doctor.photo+"','"+doctor.contactno+"')";
		
		db.getResults(sql,function(results){
			console.log("abc :",results.insertId);
			var sql2 = "INSERT INTO doctor_table(d_db,d_qualification,d_about,user_id,d_fee) VALUES ('"+doctor.dob+"','"+doctor.qualification+"','"+doctor.about+"','"+results.insertId+"','"+doctor.fee+"')";
			db.getResults(sql2,function(results){
			callback(results);
			//abc = status.insertId;
			//console.log("abc :",abc);
			});
		});
	},

	insertAdmin: function(admin, callback){
		var sql = "INSERT INTO users(fullname,username,email,password,type,photo,contactno) VALUES ('"+admin.fullname+"','"+admin.username+"','"+admin.email+"','"+admin.password+"','"+admin.type+"','"+admin.photo+"','"+admin.contactno+"')";
		
		db.getResults(sql,function(results){
			
			callback(results);
			//abc = status.insertId;
			//console.log("abc :",abc);
			});
		
	},
	insertService: function(service, callback){
		var sql = "INSERT INTO service(name,price) VALUES ('"+service.name+"','"+service.price+"')";
		
		db.getResults(sql,function(results){
			
			callback(results);
			//abc = status.insertId;
			//console.log("abc :",abc);
			});
		
	},

	update: function(admin, callback){
		console.log(admin);
		var sql = "update users set fullname = '"+admin.fullname+"', username = '"+admin.username+"',email = '"+admin.email+"', password = '"+admin.password+"',contactno = '"+admin.contactno+"' where user_id = '"+admin.id+"'";
		//var sql = "INSERT INTO users(fullname,username,email,password,type,photo,contactno) VALUES ('"+admin.fullname+"','"+admin.username+"','"+admin.email+"','"+admin.password+"','"+admin.type+"','"+admin.photo+"','"+admin.contactno+"')";
		
		db.getResults(sql,function(results){
			
			callback(results);
			//abc = status.insertId;
			//console.log("abc :",abc);
			});
	},
	updatePass: function(user, callback){
		//console.log(admin);
		var sql = "update users set  password = '"+user.password+"' where user_id = '"+user.id+"'";
		//var sql = "INSERT INTO users(fullname,username,email,password,type,photo,contactno) VALUES ('"+admin.fullname+"','"+admin.username+"','"+admin.email+"','"+admin.password+"','"+admin.type+"','"+admin.photo+"','"+admin.contactno+"')";
		
		
			
			db.execute(sql, function(status){
				if(status){
					callback(true);
				}else{
					callback(false);
				}
			});
			
	},
	delete: function(doctor, callback){
		var sql = "DELETE FROM users WHERE user_id = '"+doctor.id+"'";
		//var sql2 = "DELETE FROM doctor_table WHERE user_id = '"+doctor.id+"'";
		//sql = {sql1,sql2};
		
		db.execute(sql,function(status){
		
				if(status){
					callback(true);
				}else{
					callback(false);
				}
			});
			
		
	},
	deleteAdmin: function(admin, callback){
		var sql = "DELETE FROM users WHERE user_id = '"+admin.id+"'";
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