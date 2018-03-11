var DB = require('../config/database');
var fs = require('fs');

module.exports = function(app) {

	app.get('/api/todos', function(req, res) {
		var pg = DB.open();
		pg.select().table('spatial_ref_sys').limit(10).then(function(data) {
			pg.destroy();
			res.json(data);
		}).catch(err => {
			pg.destroy();
			res.json(err);
		})
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {
			console.log("requesttttt",req.files.file);
			var fileName = req.files.file.name;
			var fileData = req.files.file.data;
			
			fs.writeFile(fileName, fileData, (err) => {
			  if (err) throw err;
			  console.log('The file has been saved!');
			  res.json('Successsss');
			});	
			
			
		// create a todo, information comes from AJAX request from Angular
		/*Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
		*/

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};