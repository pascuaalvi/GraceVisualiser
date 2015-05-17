var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("Loading Index");

// Routes
router.get('/', function (req, res) {
  res.render('index', { title: 'Grace Editor' });
});

router.get('/code', function (req, res) {
  // Filename of file to get states of
  var fileName = req.query.fileName;
  console.log(fileName);
	var db = req.db;
	var fileArray = [];
  var query = "";

  if(fileName){
    query = 'SELECT uID AS id, created, filecontent '
      +'FROM filestates '
      +'WHERE fileID = '
      +'(SELECT fileID FROM files WHERE fileName="'+fileName+'")';
  }
  else{
    query = 'SELECT uID AS id, created, filecontent '
      +'FROM filestates ';
  }
  console.log("QUERY: "+query)

	db.serialize(function() {
    var before = null;
    db.each(query, function(err, row) {
    	//fileArray[count] = ({id: row.id, info: row.info});
      var d = new Date(row.created*1000).toString();
    	fileArray.push({ id:row.id, created:d, content:row.filecontent, previous: before});
      console.log(row.id + ': ' + row.filecontent + " CREATED: "+d+" BEFORE: "+before);
      before = row.id;
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
    // Variables for checks
    var isNewFile = true;
    var isNewState = true;

    // Check if file exists already
    db.serialize(function() {
      var counter = "SELECT count(*) as numRows FROM files "
        + "WHERE fileName='" + filename+"'";

      var search = "SELECT fileID FROM files "
        + "WHERE fileName='" + filename+"'";

      // Check if filename exists in DB already (table: files)
      db.each(counter, function(err, row) {
        if(row.numRows > 0){
          isNewFile = false;
          console.log("File found in DB.");
        }
      });
      setTimeout(function(){
        // If so, then use the fileID from that
        if(!isNewFile){
          db.each(search, function(err, row) {
            fileID = row.fileID;
            console.log("Update on file. Using ID: "+fileID);
          });
        }
        setTimeout(function(){
          // If it isn't a new file, then check if content is different.
          if(!isNewFile){
            var compare = "SELECT filecontent FROM filestates "
            + "WHERE fileID = "+fileID+" "
            + "ORDER BY created DESC LIMIT 1"
            db.each(compare, function(err, row) {
              if(filecontent === row.filecontent){
                isNewState = false;
                console.log("GESUNDHEIT!");
              } 
            });
          }
          setTimeout(function(){
            // Do writes to database
            db.serialize(function() {      
              if(isNewState){
                if(isNewFile){
                  var filenames = db.run(
                    "INSERT INTO files (fileID, filename) VALUES ("
                      +fileID+",'"+filename+"')");
                }
                var filestates = db.run(
                  "INSERT INTO filestates (uID, fileID, created, filecontent) VALUES ("
                    +guid+","+fileID+","+created+",'"+filecontent+"')");            
              }
            });

            setTimeout(function() {
              if(isNewState){
                // res.send("File Saved");
                res.send("ID: "+guid+" TIME: "+created+" NAME: " + filename + " CONTENT: "+filecontent);
              }
              else {
                res.send("You haven't made any changes!");
              }
            }, 1);
          }, 1);
        }, 1);
      }, 1);
    });
});

router["delete"]("/service/file/new/:id",
  function (req, res) {

  }
);

module.exports = router;
