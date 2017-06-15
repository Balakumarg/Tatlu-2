var express = require('express');
var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');
var fs = require('fs');
var app = new express();
app.use(bodyParser.json());
var gfs;
var conn;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1/t');
conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
conn.once('open', function() {
    console.log("DB Connection opened Successfully !!!!!!")
    gfs = Grid(conn.db);

    app.get('/', function(req, res) {
        res.render('index');
    });
    app.post('/', multer({ dest: './uploads/' }).single('upl'), function(req, res) {
        var fileName = req.file.filename;
        console.log("name", fileName);
        var filePath = process.cwd() + '/uploads/' + fileName;
        console.log("path", filePath);
        var originalName = req.file.originalname;
        console.log("filename", originalName);
        var user = /************************************* GIVE GMAIL OR UNIQUE ID*********************/
        var writestream = gfs.createWriteStream({
            _id: user,
            filename: originalName
        });

        fs.createReadStream(filePath).pipe(writestream);
        writestream.on('close', function(file) {
            fs.unlink(filePath, function() {
                res.json(file);
                res.status(204).end();
            });
        });


    });
    app.get('/file/:id', function(req, res) {
        var fileID = req.param('id');
        gfs.files.find({ _id: fileID }).toArray(function(err, files) {
            if (err) {
                res.json(err);
                res.status(400).end();
            } else {
                if (files.length > 0) {
                    files.forEach(function(file) {

                        console.log("*******************", file);
                        console.log("*******************", file.contentType);
                        console.log("*******************", file.filename);
                        res.set('Content-Type', file.contentType);
                        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
                        var read_stream = gfs.createReadStream({ _id: fileID });

                        read_stream.pipe(res);
                    });
                } else {
                    res.json({ "error": "File Not Found" });
                    res.status(400).end();
                }
            }
        });
    });


});




html----------page



html
    head
        title
    body
        form(method="post",enctype="multipart/form-data",action="/profilephoto")
            p
                input(type="file",name="upl")
            p
                input(type="submit")
