var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var managelayoutSchema = mongoose.Schema({

     panel1:String,
     panel2:String,
     panel3: String,
     panel4 : String,
     panel5: String,
     panel6 : String

    });

var layout = mongoose.model( 'layout',managelayoutSchema, 'managelayout_collection');




router.get('/managelayout', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    layout.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/managelayout/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     layout.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/managelayout', function(req, res){
  console.log(req.body);



  var Pan1 = req.body.panel1;
    var Pan2 = req.body.panel2;
    var Pan3 = req.body.panel3;
    var Pan4 = req.body.panel4;
    var Pan5 = req.body.panel5;
    var Pan6 = req.body.panel6;



   var global1 = new layout({
     panel1:Pan1,
     panel2:Pan2,
     panel3:Pan3,
     panel4:Pan4,
     panel5:Pan5,
     panel6:Pan6


  });


  global1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/globals/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      globaladm.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/globals/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    globaladm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
