var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var MedicationSchema = mongoose.Schema({
    Generic:String,
    Manufacturar:String,
    ManufacturerId:String,
    Strength:String,
    Drug:String,
    DrugId:String,
    Info:String


    });

var Medication = mongoose.model('Medication', MedicationSchema, 'medi_collection');




router.get('/medi', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Medication.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/medi/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Medication.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/medi', function(req, res){
  console.log(req.body);


  var gen = req.body.Generic;
    var manu = req.body.Manufacturar;
    var manId = req.body.ManufacturerId;
    var strn = req.body.Strength;
    var drug = req.body.Drug;
    var drugId = req.body.DrugId;
    var inf = req.body.Info;



   var medi1 = new Medication({
     Generic:gen,
     Manufacturar:manu,
     ManufacturerId:manId,
     Strength:strn,
     Drug:drug,
     DrugId:drugId,
     Info:inf

  });


  medi1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/medi/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Medication.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/medi/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Medication.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
