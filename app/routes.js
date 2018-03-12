var DB = require('../config/database');
var fs = require('fs');
var xlsxj = require("xlsx-to-json");

module.exports = function(app) {

	app.get('/api/users', function(req, res) {
		var pg = DB.open();
		pg.select().table('users').limit(10).then(function(data) {
			pg.destroy();
			res.json(data);
		}).catch(err => {
			pg.destroy();
			res.json(err);
		})
	});
	
	app.post('/api/users', function(req, res) {
			var fileName = req.files.file.name;
			var fileData = req.files.file.data;
			var pg = DB.open();
			fs.writeFile(fileName, fileData, (err) => {
			  if (err) throw err;
				console.log("Filenameeeeeee", fileName);
				xlsxj({
				input: fileName, 
				output: "output.json"
				}, function(err, result) {
				if(err) {
				  console.error(err);
				}else {
				  pg('users').insert(result).then(function(data) {
					pg.destroy();
					res.json(data);
				  }).catch(err => {
					pg.destroy();
					res.json(err);
				  })
				}
				});
			});
			
	});

	// delete a todo
	app.get('/api/reports/male', function(req, res) {
		var pg = DB.open();
		var query = `select  nationality,gender,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) < 30  THEN COUNT(1)
		END as belowthirty,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) > 30 and  Extract(year from (age(current_date,cast(dob as date)))) < 40  THEN COUNT(1)
		END as abovefourty,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) > 50 THEN COUNT(1)
		END as abovefifity
		from users group by nationality,gender,dob
		having gender = 'Male'`;
		
		pg.raw(query).then(function(data) {
			pg.destroy();
			console.log(data.rows)
			res.json(data.rows);
		}).catch(err => {
			pg.destroy();
			res.json(err);
		})
	});
	
	app.get('/api/reports/female', function(req, res) {
		var pg = DB.open();
		var query = `select  nationality,gender,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) < 30  THEN COUNT(1)
		END as belowthirty,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) > 30 and  Extract(year from (age(current_date,cast(dob as date)))) < 40  THEN COUNT(1)
		END as abovefourty,
		CASE
		WHEN Extract(year from (age(current_date,cast(dob as date)))) > 50 THEN COUNT(1)
		END as abovefifity
		from users group by nationality,gender,dob
		having gender = 'Female'`;
		pg.raw(query).then(function(data) {
			pg.destroy();
			res.json(data.rows);
		}).catch(err => {
			pg.destroy();
			res.json(err);
		})
	});
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};