var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var MemberPlanSchema = mongoose.Schema({
        type:String,
      cost:String

    });

var MemberPlan = mongoose.model('MemberPlan', MemberPlanSchema, 'MemberPlan_collection');




router.get('/plan', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    MemberPlan.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/plan/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     MemberPlan.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/plan', function(req, res){
  console.log(req.body);


  var typ = req.body.type;
    var cst = req.body.cost;


   var plan1 = new MemberPlan({
     type:typ,

     cost:cst


  });


  plan1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/plan/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      MemberPlan.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/plan/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    MemberPlan.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
