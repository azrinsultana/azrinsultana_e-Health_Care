const db = require('./db');

module.exports= {

	
	getById: function(id, callback){
		
var sql="select * from blog where blog_id='"+id+"'";
console.log(sql);
db.getResults(sql, function(results){
	if(results.length>0 ){
		
		callback(results);
		
	}else{
		console.log("not found");
	}
});

	},



	getsearch:function(keyword,callback){
var sql='select * from blog where title like "%'+keyword+'%"' ;
console.log(sql);
db.getResults(sql, function(results){
	
		console.log(results);
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
	
		var sql = "INSERT INTO blog (title,catagory,details,user_id) VALUES ('"+blog.title+"', '"+blog.catagory+"','"+blog.details+"','"+blog.userid+"')";
console.log(sql);
		db.execute(sql, function(status){
            
            callback(status);
        
		});
    },
    
	update:function(blog, callback){
var sql="UPDATE blog SET blog_id='"+blog.id+"', title='"+blog.title+"',catagory='"+blog.catagory+"',details='"+blog.details+"' WHERE blog_id='"+blog.id+"' ";
console.log(sql);
db.execute(sql, function(status){
	callback(status);
});
	},
/*
	delete: function(id, callback){
var sql="DELETE FROM appointmenttable WHERE id='"+id+"'";	

		db.execute(sql, function(status){
			callback(status);
		});
    }
    
	*/
}
