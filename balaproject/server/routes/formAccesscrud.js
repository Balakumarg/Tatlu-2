var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var formSchema = mongoose.Schema({
    userType:String,
		doctorRegAdd:Boolean,
    doctorRegEdit:Boolean,
    doctorRegDel:Boolean,
		nurseReg:{addi:String,deletei:String,editi:String}

    });

var Form = mongoose.model('Form', formSchema, 'formAccCollection');




router.get('/formAcc', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Form.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/formAcc/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Form.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/formAcc', function(req, res){
  console.log(req.body);


  var type = req.body.userType;
  var docadd = req.body.doctorRegAdd;
  var docEdi = req.body.doctorRegEdit;
  var docDel = req.body.doctorRegDel;

    var nurRsg = req.body.nurseReg;



   var formAccess1 = new Form({
     userType:type,
     doctorRegAdd:docadd,
     doctorRegEdit:docEdi,
     doctorRegDel:docDel,
     nurseReg:nurRsg

  });


  formAccess1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/formAcc/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Form.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/formAcc/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Form.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
