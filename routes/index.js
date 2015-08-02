var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("Loading Index");

/* 
  Click Event Method

  I separated it from the /service/click endpoint in order to
  prevent request collisions with the following:
    - Visualise request
    - Save request
 */
 /*
addClickEvent = function (db, clickEventString){
  // Is it a new click event?
  var isNewClickEvent = true;
  // If not, then how many clicks do we have so far?
  var clicks = 0;
  // Check if it exists
  db.serialize(function() {
    var exists = "SELECT count(*) as numRows FROM clickdata "
      + "WHERE elementName='" + clickEventString+"'";
    // Check if element exists in DB already (table: clickdata)
    db.each(exists, function(err, row) {
      if(row.numRows === 0){
        console.log('Click Event not defined yet.');
      }
      else {
        isNewClickEvent = false;
        console.log("Click Event found in DB.");          
      }
    }, function(){
      function next(){
        // Do writes to database  
        if(isNewClickEvent){
          var newClick = db.run(
                  "INSERT INTO clickdata (elementName, clicks) VALUES ('"
                    +clickEventString+"',"+1+")");
        }
        else {
          var newClicks = clicks+1;
          console.log("NEWCOUNT: "+newClicks);
          var updateClick = db.run(
                  "UPDATE clickdata SET clicks="+newClicks
                  +" WHERE elementName='"+clickEventString+"'");
        }
      }

      // Only when updating click event tally
      if(!isNewClickEvent){
        var counter = "SELECT clicks FROM clickdata "
          + "WHERE elementName='" + clickEventString+"'";
        db.each(counter, function(err, row) {
          clicks = row.clicks;
        }, next);
      } else {
        next();
      }
    });
  });
}
*/

// Routes
router.get('/', function (req, res) {
  res.render('index', { title: 'Grace Editor' });
});

// Get the files
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
    }, function(){
      //addClickEvent(db, "visualize button");
      res.render('viz', {
        fileToViz: fileName,
        title: 'Graceful Visualizer',
        files: fileArray
      });
    });		 
	});
});

// For analysis - count clicks on elements
/*
router.post("/service/click",
  function (req, res) {
    var db = req.db;
    // The event
    var clickEvent = req.body.clickEvent;
    addClickEvent(db, clickEvent);
});
*/

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
      }, function() {
        function response () {
          //addClickEvent(db, "saveFile button");
          if(isNewState){
            res.send("File Saved");
            //res.send("ID: "+guid+" TIME: "+created+" NAME: " + filename + " CONTENT: "+filecontent);
          }
          else {
            res.send("You haven't made any changes!");
          }
        }

        function write() {      
          // If it isn't a new file, then check if content is different.
          if(isNewState){
            if(isNewFile){
              var filenames = db.run(
                "INSERT INTO files (fileID, filename) VALUES (?,?)",
                [fileID,filename], response);
            }
            var filestates = db.run(
              "INSERT INTO filestates (uID, fileID, created, filecontent) VALUES (?,?,?,?)",
                [guid,fileID,created,filecontent],response);            
          }
        }

        // If so, then use the fileID from that
        if(!isNewFile){
          db.each(search, function(err, row) {
            fileID = row.fileID;
            console.log("Update on file. Using ID: "+fileID);
          }, function (){
            var compare = "SELECT filecontent FROM filestates "
            + "WHERE fileID = "+fileID+" "
            + "ORDER BY created DESC LIMIT 1"
            db.each(compare, function(err, row) {
              if(filecontent === row.filecontent){
                isNewState = false;
                console.log("File content is the same as before!");
              } 
            }, write);
          });
        } 
        else{
          write()
        }
      });
    });
  }
);

router["delete"]("/service/file/new/:id",
  function (req, res) {

  }
);

module.exports = router;
