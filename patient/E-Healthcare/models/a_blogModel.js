 
const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},

	getDoctors: function(callback){
		var sql = "select * from users where type='doctor'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},




	getAll: function(callback){
		var sql = "select * from blog";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(blog, callback){
		var sql = "INSERT INTO blog(title,details,photo,time,user_id) VALUES ('"+blog.title+"','"+blog.details+"','"+blog.photo+"','"+blog.time+"','"+blog.id+"')";
		
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
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
	delete: function(blog, callback){
		var sql = "DELETE FROM blog WHERE blog_id = '"+blog.id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	}
}