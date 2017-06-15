var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var rulesSchema = mongoose.Schema({

     title:{type:String},
     activealert:Boolean,
     passivealert: Boolean,
     patientremainder : Boolean,
     cwarning: String,
      cwarningdate: String,
      cwarningpast: String,
       cwarningpastdate: {type:String},

      pwarning: String,
       pwarningdate: String,
       pwarningpast: String,
        pwarningpastdate: String,


    });

var rulesadm = mongoose.model( 'rulesadm',rulesSchema, 'rules_collection');


router.get('/rules', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    rulesadm.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/rules/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     rulesadm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/rules', function(req, res){
  console.log(req.body);



  var Title = req.body.title;
    var Aalert = req.body.activealert;
    var Palert = req.body.passivealert;
    var Premain = req.body.patientremainder;
    var Cwarn = req.body.cwarning;
    var Cwdate = req.body.cwarningdate;
    var Cwarnpast = req.body.cwarningpast;
    var Cwpastdate = req.body.cwarningpastdate;
    var Pwarn = req.body.pwarning;
    var Pwarndate = req.body.pwarningdate;
    var Pwarnpast = req.body.pwarningpast;
    var Pwarnpastdate = req.body.pwarningpastdate;



   var rules = new rulesadm({
     title:Title,
     activealert:Aalert,
     passivealert:Palert,
     patientremainder:Premain,
     cwarning:Cwarn,
     cwarningdate:Cwdate,
     cwarningpast:Cwarnpast,
     cwarningpastdate:Cwpastdate,
     pwarning:Pwarn,
     pwarningdate:Pwarndate,
     pwarningpast:Pwarnpast,
     pwarningpastdate:Pwarnpastdate


  });









  rules.save(function(error, docs){
    if ( error ) throw error;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/rules/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      rulesadm.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/rules/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    rulesadm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
