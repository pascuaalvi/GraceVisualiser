var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("Loading Index");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grace Editor' });
});

router.get('/code', function(req, res, next) {
	var db = req.db;
	var files = [];
	db.serialize(function() {
		var count = 0
	    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
	    	files[count] = ({id: row.id, info: row.info});
	      console.log(row.id + ': ' + row.info);
	      count++;
	    });
	  console.log("Rendering...");  
	});
	res.render('viz', { title: 'Grace Visualize', files:files });
});

module.exports = router;
