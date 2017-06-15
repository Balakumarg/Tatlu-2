var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var procedureSchema = mongoose.Schema({
      id:String,
      type:String,
      subType:String,
      standaredInstruction:String


    });

var Procedure = mongoose.model('Procedure', procedureSchema, 'Procedureu_collection');




router.get('/prcd', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON procedure SERVER");

    Procedure.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/prcd/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON procedure 1111 SERVER");
     Procedure.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/prcd', function(req, res){
  console.log(req.body);


  var Id = req.body.id;
  var tpe = req.body.type;
  var stpe = req.body.subType;
  var inst = req.body.standaredInstruction;





   var procedureCont = new Procedure({
     id:Id,
     type:tpe,
     standaredInstruction:inst,
     subType:stpe

  });


  procedureCont.save(function(err, docs){
    if ( err ) throw err;
    console.log("pro Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/prcd/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Procedure.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/prcd/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Procedure.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
