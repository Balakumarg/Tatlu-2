var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var globalSchema3 = mongoose.Schema({

     timeout:String,
     strongpswd:Boolean,
     minimumchar: String,
     maximumchar : Boolean,
     casesensitive : String
    });

var globaladm3 = mongoose.model( 'globaladm3',globalSchema3, 'global3_collection');


router.get('/globals3', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    globaladm3.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/globals3/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     globaladm3.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/globals3', function(req, res){
  console.log(req.body);



  var Timeout = req.body.timeout;
    var spswd = req.body.strongpswd;
    var minchar = req.body.minimumchar;
    var maxchar = req.body.maximumchar;
    var csenseitive = req.body.casesensitive;


   var global3 = new globaladm3({
     timeout:Timeout,
     strongpswd:spswd,
     minimumchar:minchar,
     maximumchar:maxchar,
     casesensitive:csenseitive

  });


  global3.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/globals3/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      globaladm3.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/globals3/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    globaladm3.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
