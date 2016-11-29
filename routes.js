var ebook = require('./models/ebook');

module.exports = {
	configure: function(app){
		app.get('/ebook/', function(req, res){
			ebook.get(res);
		});

		app.post('/ebook/', function(req, res){
			ebook.create(req.body, res);
		});

		app.put('/ebook/', function(req, res){
			ebook.update(req.body, res);
		});

		app.delete('/ebook/:id/', function(req, res){
			ebook.delete(req.params.id, res);
		});
	}
};