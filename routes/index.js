var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("Loading Index");

// Routes
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Grace Editor' });
});

router.get('/code', function (req, res, next) {
  // Filename of file to get states of
  var fileName = req.body.fileName;
  console.log(fileName);
	var db = req.db;
	var fileArray = [];
	db.serialize(function() {
    db.each('SELECT fileID AS id, created, filecontent '
      +'FROM filestates '
      +'WHERE fileID = '
      +'(SELECT fileID FROM files WHERE fileName="'+fileName+'")', 
      function(err, row) {
    	//fileArray[count] = ({id: row.id, info: row.info});
      var d = new Date(row.created).toString();
    	fileArray.push({ id:row.id, created:d, content:row.filecontent });
      console.log(row.id + ': ' + row.filecontent + "CREATED: "+d);
    });
		console.log("Rendering...");  
		console.log(fileArray);
		
		setTimeout(function(){
			res.render('viz', { title: 'Grace Visualize', files:fileArray});	 
		}, 10);
		 
	});
});

// Get the files
router.get("/service/file",
  function (req, res) {
    var db = req.db;

    res.send("Hello world!");
  }
);

// Add some files and store an initial state
// If already added, just store a state w/
//	existing fileID
router.post('/service/file/save',
  function (req, res) {
  	// Filename is a string
  	var filename = req.body.fileName;
  	// Content sent as base64
  	var filecontent = req.body.fileContent;
  	// This id is random every time
  	var guid = req.guid();
  	// Constrained due to link in names -> states
  	var fileID = req.guid();
  	// Get timestamp of NOW
  	var created = req.timestamp();
  	// Get db from app.js
  	var db = req.db;
  	// Do writes to database
  	db.serialize(function() {
  		// Check if filename exists in DB already (table: files)
  		// If so, then use the uid from that
	    var filenames = db.run(
	    	"INSERT INTO files (fileID, filename) VALUES ("
	    		+fileID+",'"+filename+"')");
  		var filestates = db.run(
  			"INSERT INTO filestates (uID, fileID, created, filecontent) VALUES ("
  				+guid+","+fileID+","+created+",'"+filecontent+"')");	 
		});

  	res.send("ID: "+guid+" TIME: "+created+" NAME: " + filename + " CONTENT: "+filecontent);
  	// res.send("Success");
  }
);

router["delete"]("/service/file/new/:id",
  function (req, res) {

  }
);

module.exports = router;
