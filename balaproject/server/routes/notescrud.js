var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var NotesSchema = mongoose.Schema({
    heading:String,
    description:String,
    date:String,
    time:String


    });

var Notes = mongoose.model('Notes', NotesSchema, 'notes_collection');




router.get('/note', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Notes.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/note/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Notes.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/note', function(req, res){
  console.log(req.body);


  var head = req.body.heading;
    var des = req.body.description;
    var dt = req.body.date;
    var tme = req.body.time;


   var note1 = new Notes({
     heading:head,
     description:des,
     date:dt,
     time:tme


  });


  note1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/note/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Notes.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/note/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Notes.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
