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
	
	getById: function(id, callback){
		 
        var sql="select * from withdraw where id='"+id+"'";
        db.getResults(sql, function(results){
            if(results.length >0 ){
                
                callback(results);
                
            }else{
                console.log("not found");
            }
        });
        
	 },
	 getByUservalue: function(user, callback){
		 
        var sql="select * from withdraw where username='"+user+"'";
        db.getResults(sql, function(results){
            if(results.length >0 ){
                
                callback(results);
                
            }else{
                console.log("not found");
            }
        });
        
	 },
	 
	 getByUser: function(withdraw, callback){
		 
		var sql="select * from withdraw where id='"+withdraw.incid+"' and username='"+withdraw.username+"'";
		console.log(sql);
        db.getResults(sql, function(results){
            if(results.length >0 ){
                
                callback(results);
                
            }else{
                console.log("not found");
            }
        });
        
	 },
	 
	 
	getAll: function(callback){
		console.log("data");
		var sql = "select * from withdraw order by id desc" ;
		db.getResults(sql, function(results){
			callback(results);
			
		});
	},
	
	
	insert: function(withdraw, callback){
	
		var sql = "INSERT INTO withdraw (username,name,email,contactno,specalist,qualification,totalmoney,paymentoption,withdrawamount,netamount) VALUES ('"+withdraw.username+"', '"+withdraw.name+"','"+withdraw.email+"','"+withdraw.contactno+"','"+withdraw.specalist+"','"+withdraw.qualification+"','"+withdraw.totalmoney+"','"+withdraw.paymentoption+"','"+withdraw.withdrawamount+"','"+withdraw.netmoney+"')";
	
		db.execute(sql, function(status){
			callback(status);
		});
	},
	/*
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
