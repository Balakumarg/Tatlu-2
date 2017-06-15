var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var VisitSchema = mongoose.Schema({
    patientid:String,
    DoctorId:String,
    VisitingDocotor:String,
    visitdate:String,
    // visitdate: {type:String,require:true},
    visitTime:String,
    Reason:String


    });

var Visit = mongoose.model('Visit', VisitSchema, 'visit_collection');




router.get('/visit', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Visit.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/visit/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Visit.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/visit', function(req, res){
  console.log(req.body);


  var pid = req.body.patientid;
    var did = req.body.DoctorId;
    var doc = req.body.VisitingDocotor;
    var date = req.body.visitdate;
    var time = req.body.visitTime;
    var reason = req.body.Reason;


   var visit1 = new Visit({
     patientid:pid,
     DoctorId:did,
     VisitingDocotor:doc,
     visitdate:date,
     visitTime:time,
     Reason:reason

  });


  visit1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/visit/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Visit.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/visit/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Visit.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
