const db = require('./db');

module.exports= {
	
	validate: function(doctor, callback){
		var sql = "select * from doctortable where username='"+doctor.username+"' and password='"+doctor.password+"'";
		
		db.getResults(sql, function(results){
			if(results.length >0 ){
				             
				callback(results);
			}else{
				callback(false);
			}
		});
	},

	
	getById: function(username, callback){
		
var sql="select * from doctortable where username='"+username+"'";
db.getResults(sql, function(results){
	if(results.length >0 ){
		
		callback(results);
		
	}else{
		console.log("not found");
	}
});

	},
	/*
	getAll: function(callback){
		console.log("data");
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	
	
	insert: function(user, callback){
	
		var sql = "INSERT INTO user (username,name,password,email,address) VALUES ('"+user.username+"', '"+user.name+"','"+user.password+"','"+user.email+"','"+user.address+"')";
	
		db.execute(sql, function(status){
			callback(status);
		});
	},
	loginsert: function(user){
	
		var sql = "INSERT INTO login (username,password,role) VALUES ('"+user.username+"', '"+user.password+"','1')";
	
		db.execute(sql, function(status){
			callback(status);
		});
	},
	*/
	update:function(doctor, callback){
var sql="UPDATE doctortable SET username='"+doctor.username+"',name='"+doctor.name+"',password='"+doctor.password+"',email='"+doctor.email+"',contactno='"+doctor.contactno+"',specalist='"+doctor.specalist+"',qualification='"+doctor.qualification+"',fee='"+doctor.fee+"',address='"+doctor.address+"' WHERE username='"+doctor.username+"' ";
console.log(sql);
db.execute(sql, function(status){
	callback(status);
});
	},
/*
	delete: function(username, callback){
var sql="DELETE FROM user WHERE username='"+username+"'";	
console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
    }
    */
	
}
