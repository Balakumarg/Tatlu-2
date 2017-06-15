var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var globalSchema = mongoose.Schema({

     width:String,
     title:String,
     left_menu: Boolean,
     visit_form : Boolean

    });

var globaladm = mongoose.model( 'globaladm',globalSchema, 'global_collection');




router.get('/globals', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    globaladm.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/globals/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     globaladm.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/globals', function(req, res){
  console.log(req.body);



  var Width = req.body.width;
    var Title = req.body.title;
    var Leftmenu = req.body.left_menu;
    var Visitform = req.body.visit_form;


   var global1 = new globaladm({
     width:Width,
     title:Title,
     left_menu:Leftmenu,
     visit_form:Visitform


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
