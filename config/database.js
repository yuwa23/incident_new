
module.exports.open = function () {
  var pg = require('knex')({
  client: 'pg',
  connection: 'postgres://waucryds:EtvhrRjmX9ICx8Bfw4A4zUUHZEVwOdA9@baasu.db.elephantsql.com:5432/waucryds',
  searchPath: ['knex', 'public'],
 });
 
 return pg;

}





