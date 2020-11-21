const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getById_user: function(id, callback){
		var sql = "select * from users where user_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById_patient: function(id, callback){
		var sql = "select * from patient_info where user_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById_app: function(id, callback){
		var sql = "select * from appointmenttable where d_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById_consult: function(id, callback){
		var sql = "select * from consulting where p_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById_payment: function(id, callback){
		var sql = "select * from patient_payment where p_id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll_medicine: function(callback){
		var sql = "select * from medicine";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll_doctor: function(callback){
		var sql = "SELECT * from doctor_table INNER JOIN users ON doctor_table.user_id=users.user_id ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll_blog: function(callback){
		var sql = "SELECT * from blog INNER JOIN users ON blog.user_id=users.user_id ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	search_doctor: function(search , callback){
		var sql = "SELECT * from doctor_table INNER JOIN users ON doctor_table.user_id=users.user_id  where doctor_table.d_department LIKE '%"+search+"%' or users.fullname LIKE '%"+search+"%' ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	search_medicine: function(search , callback){
		var sql = "SELECT * from medicine  where name LIKE '%"+search+"%' or price LIKE '%"+search+"%' ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert_user: function(user, callback){
		
		username =  user.username;
		fullname =  user.fullname;
		email =  user.email;
		password =  user.password;
		contactno =  user.contactno;
		p_birth_date =  user.p_birth_date;
		p_address =  user.p_address;
		p_blood_group =  user.p_blood_group;
		p_bmi =  user.p_bmi;
		p_weight =  user.p_weight;
		p_blood_p =  user.p_blood_p;
		p_cal_in =  user.p_cal_in;
		photo =  user.photo;
		//console.log(user)
		var sql = "INSERT INTO users (fullname,username, email,password,photo,contactno) VALUES ('"+fullname+"', '"+username+"', '"+email+"','"+password+"','"+photo+"','"+contactno+"')";
		db.getResults(sql, function(results1){
			var id = results1.insertId;
			//callback(results1);

			var sql2 = "INSERT INTO patient_info (p_birth_date,p_address, p_blood_group,p_bmi,p_weight,p_blood_p,p_cal_in,user_id) VALUES ('"+p_birth_date+"', '"+p_address+"', '"+p_blood_group+"','"+p_bmi+"','"+p_weight+"','"+p_blood_p+"','"+p_cal_in+"','"+id+"')";
			db.getResults(sql2, function(results){
				callback(results);
			});
			
		});
	},
	insert_consult: function(con, callback){
		department = con.department;		 	
		payment_status = 'due';
		time = con.time;
		date = con.date;
		status = '0';
		d_id = con.d_id;
	 	p_id = con.p_id;
		var sql = "INSERT INTO consulting (department,payment_status,time,date,status,d_id,p_id) VALUES ('"+department+"', '"+payment_status+"', '"+time+"', '"+date+"', '"+status+"','"+d_id+"','"+p_id+"')";
		db.getResults(sql, function(results1){
            console.log("db.getResults -> results", results1);
			
			callback(results1);
		});
	},
	insert_payment: function(payment, callback){
		gateway = payment.gateway;		 	
		payment_status = payment.payment_status;
		payment_date = payment.payment_date;
		d_id = payment.d_id;
	 	p_id = payment.p_id;
		 amount = '500';
		 payment_status_comsulting = 'Paid';
		var sql = "INSERT INTO patient_payment (amount,gateway,payment_date,payment_status,p_id,d_id) VALUES ('"+amount+"', '"+gateway+"', '"+payment_date+"', '"+payment_status+"', '"+p_id+"','"+d_id+"')";
		db.getResults(sql, function(results1){
			//callback(results1);

		});

		var sql = "update consulting SET payment_status = '"+payment_status_comsulting+"' WHERE p_id='"+p_id+"'";
		db.getResults(sql, function(results){
		callback(results);
});
	},
	update_user:function(user, callback){
		id = user.id;

		email = user.email;
		password = user.password;
		contactno = user.contactno;

		p_address = user.p_address;
		p_bmi = user.p_bmi;
		p_weight = user.p_weight;
		p_blood_p = user.p_blood_p;
		p_cal_in = user.p_cal_in;
		console.log(user)
		var sql = "update users SET email = '"+email+"',password = '"+password+"',contactno = '"+contactno+"'  WHERE user_id='"+id+"'";
		db.getResults(sql, function(results1){
			//callback(results1);
			
		});
		var sql = "update patient_info SET p_address = '"+p_address+"',p_bmi = '"+p_bmi+"',p_weight = '"+p_weight+"', p_blood_p = '"+p_blood_p+"', p_cal_in = '"+p_cal_in+"' WHERE user_id='"+id+"'";
		db.getResults(sql, function(results){
		callback(results);
});
	},
	update_job:function(user, callback){
		id = user.id;
		c_name = user.c_name,
		job_tittle = user.job_tittle,
		job_loc = user.job_loc,
		salary = user.salary
		console.log(c_name)
		var sql = "update job SET c_name = '"+c_name+"',job_tittle = '"+job_tittle+"',job_loc = '"+job_loc+"', salary = '"+salary+"' WHERE id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete_emp: function(id, callback){
		var sql = "DELETE FROM user WHERE id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete_job: function(id, callback){
		var sql = "DELETE FROM job WHERE id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	search_emp: function(search, callback){
		var sql = "select * from user where emp_name='"+search+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	}
	
}
