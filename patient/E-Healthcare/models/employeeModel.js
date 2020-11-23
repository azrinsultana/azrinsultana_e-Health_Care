  
const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = "select * from jobs where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from jobs";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(job, callback){
		var sql = "INSERT INTO jobs(companyname,title,location,salary) VALUES ('"+job.companyname+"','"+job.jobtitle+"','"+job.location+"','"+job.salary+"')";
		
		db.execute(sql,function(status){
			callback(status);
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
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}