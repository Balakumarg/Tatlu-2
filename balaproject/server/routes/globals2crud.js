var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var globalSchema2 = mongoose.Schema({

     calendertype:String,
     starttime:String,
     endtime: String,
     interval : String,
     displaystyle : String
    });

var globaladm2 = mongoose.model( 'globaladm2',globalSchema2, 'global2_collection');


router.get('/globals2', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    globaladm2.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/globals2/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     globaladm2.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/globals2', function(req, res){
  console.log(req.body);



  var ctype = req.body.calendertype;
    var stime = req.body.starttime;
    var etime = req.body.endtime;
    var Interval = req.body.interval;
    var Display = req.body.displaystyle;


   var global2 = new globaladm2({
     calendertype:ctype,
     starttime:stime,
     endtime:etime,
     interval:Interval,
     displaystyle:Display

  });


  global2.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/globals2/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      globaladm2.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/globals2/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    globaladm2.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
