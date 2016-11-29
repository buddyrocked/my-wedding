var connection = require('../connection');

function Ebook(){
	this.get = function(res){
		connection.acquire(function(err, con){
			con.query('select * from ebook', function(err, result){
				con.release();
				con.send(result);
			});
		});
	};

	this.create = function(ebook, res){
		connection.acquire(function(err, con){
			con.query('insert into ebook set ?', ebook, function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: err});
				}else{
					res.send({status: 0, message: 'Success'});
				}
			});
		});
	};

	this.update = function(ebook, res){
		connection.acquire(function(err, con){
			con.query('update ebook set ? where id = ?', [ebook, id], function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: err});
				}else{
					res.send({status: 0, message: 'update success'});
				}
			});
		});
	}

	this.delete = function(id, res){
		connection.acquire(function(err, con){
			con.query('delete from ebook where id = ?', [id], function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: err});
				}else{
					res.send({status: 0, message: 'delete success'});
				}
			});
		});
	}
}

module.exports = new Ebook();