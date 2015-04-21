var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("Loading Index");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grace Editor' });
});

router.get('/code', function(req, res, next) {
	var db = req.db;
	var fileArray = [];
	db.serialize(function() {
	    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
	    	//fileArray[count] = ({id: row.id, info: row.info});
	    	fileArray.push({ id:row.id,info:row.info });
	      console.log(row.id + ': ' + row.info);
	    });
		console.log("Rendering...");  
		console.log(fileArray);
		
		setTimeout(function(){
			res.render('viz', { title: 'Grace Visualize', files:fileArray});	 
		}, 1000);
		 
	});
});

module.exports = router;
