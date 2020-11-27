const db = require('./db');

module.exports= {
	/*
	validate: function(doctor, callback){
		var sql = "select * from doctortable where username='"+doctor.username+"' and password='"+doctor.password+"'";
		
		db.getResults(sql, function(results){
			if(results.length >0 ){
				
			
				// var result=results[0].role;
				// console.log(result);
				callback(results);
			}else{
				callback(false);
			}
		});
	},

	*/
	getById: function(username, callback){
		 
        var sql="select * from users where username='"+username+"'";
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
	
	update:function(user, callback){
var sql="UPDATE user SET username='"+user.username+"',name='"+user.name+"',password='"+user.password+"',email='"+user.email+"',address='"+user.address+"' WHERE username='"+user.username+"' ";
console.log(sql);
db.execute(sql, function(status){
	callback(status);
});
	},

	delete: function(username, callback){
var sql="DELETE FROM user WHERE username='"+username+"'";	
console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
    }
    */
	
}
