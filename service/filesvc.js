/**
 * File REST Service
 *
 * User: pascuaalvi
 * Date: 25/04/15
 */

var parse = require('./parse.js');
var secrets = require("./secrets.js");
var validator = require("../public/common/validator.js");

/**
 * Initialize the parse API with out secrets.  Separated secrets into separate file for purposes of demo
 */
parse.initialize(secrets.getParseAppId(),
                 secrets.getParseAPIKey());

/**
 * Get a list of all file (no filter)
 *
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
exports.queryFiles = function(req, res)
{
    console.log('\nfileSvc::queryFiles');
    parse.query("File",
        function(statusCode, result)
        {
            // The service will need the full objects for processing in the service
            for (index in result.results)
            {
                var file = result.results[index];
                console.log('file: ' + file.name);
            }

            res.statusCode = statusCode;
            res.send(result);
        });
};

/**
 * Get a specific file by id
 *
 * @id      id of file to get (req.params.id)
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
exports.getFile = function(req, res, next)
{
    console.log('\nfileSvc::getFile');
    var id = req.params.id;
    if (id)
    {
        console.log('fileSvc::getFile - ' + id);
        parse.retrieve("File", id,
            function(statusCode, result)
            {
                console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
                res.statusCode = statusCode;
                res.send(result);
            });
    }
    else
    {
        next();
    }
}

/**
 * Create a file.
 *
 * @body    contains the file json object to create
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
exports.createFile = function(req, res)
{
    console.log("\nfileSvc::createFile");
    var form = req.body;
    console.log("created");
    console.log('fileSvc::createFile form: ' + JSON.stringify(form));

    var file = { name: form.name, grade: form.grade, comment: form.comment };
    console.log(file);

    var issues = validator.validateFile(file);
    var hasIssues = false;
    for (issue in issues)
    {
        hasIssues = true;
    }

    if (hasIssues)
    {
        console.log('issues: ' + JSON.stringify(issues));
        res.statusCode = 500;
        res.send(issues);
    }
    else
    {
        parse.create("File", file,
            function(statusCode, result)
            {
                console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
                res.statusCode = statusCode;
                res.send(result);
            });
    }
    // grab individual form fields
    // res.send('firstName is ' + req.body['firstName']);
};

/**
 * Delete a specific file by id
 *
 * @id      id of file to get (req.params.id)
 * @param   req: the http server request object
 * @param   res: the http server response object
 */
exports.deleteFile = function(req, res)
{
    console.log('\nfileSvc::deleteFile');
    var id = req.params.id;

    console.log('fileSvc::deleteFile - ' + id);
    parse.delete("File", id,
        function(statusCode, result)
        {
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });
}