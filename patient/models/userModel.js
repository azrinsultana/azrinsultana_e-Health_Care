const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById_emp: function(id, callback){
		var sql = "select * from user where id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById_job: function(id, callback){
		var sql = "select * from job where id='"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll_emp: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},getAll_medicine: function(callback){
		var sql = "select * from medicine";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll_job: function(callback){
		var sql = "select * from job";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert_emp: function(user, callback){
		emp_name = user.emp_name,
		c_name = user.c_name,
		contact_no = user.contact_no,
		username= user.username;
		password= user.password;
		//console.log(user)
		var sql = "INSERT INTO user (username, password, emp_name,c_name,contact_no) VALUES ('"+username+"', '"+password+"','"+emp_name+"','"+c_name+"','"+contact_no+"')";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert_job: function(user, callback){
		c_name = user.c_name,
		job_tittle = user.job_tittle,
		job_loc = user.job_loc,
		salary = user.salary
		//console.log(user)
		var sql = "INSERT INTO job (c_name, job_tittle, job_loc,salary) VALUES ('"+c_name+"', '"+job_tittle+"','"+job_loc+"','"+salary+"')";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	update_emp:function(user, callback){
		id= user.id;
		emp_name= user.emp_name;
		c_name= user.c_name;
		contact_no= user.contact_no;
		username= user.username;
		password= user.password;
		email= user.email;
		//console.log(user)
		var sql = "update user SET emp_name = '"+emp_name+"',c_name = '"+c_name+"',contact_no = '"+contact_no+"', username = '"+username+"', password = '"+password+"' WHERE id='"+id+"'";
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
