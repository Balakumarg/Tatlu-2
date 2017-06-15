var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var facilityadminSchema = mongoose.Schema({
        id:String,
     firstName:String,
     lastName:String,
     userName:String,
     profileImage:String,
     email:String,
     dob:String,
     gender:String,
     mobile:String,
  position:String,
  experiance:String,
  hospital:String,

  reference:String

    });

var facilityAdmin = mongoose.model('facilityAdmin', facilityadminSchema, 'facilityAdmin_collection');




router.get('/facilityadm', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    facilityAdmin.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/facilityadm/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     facilityAdmin.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/facilityadm', function(req, res){
  console.log(req.body);


  var Id = req.body.id;
    var Firstname = req.body.firstName;
    var Lastname = req.body.lastName;
    var Username = req.body.userName;
    var Image = req.body.profileImage;
    var Email = req.body.email;
    var Dob = req.body.dob;
      var Gender = req.body.gender;
      var Mobile = req.body.mobile;
      var pos = req.body.position;
      var exp = req.body.experiance;
      var hos = req.body.hospital;

      var ref = req.body.reference;


   var fac = new facilityAdmin({
     id:Id,
     firstName:Firstname,
     lastName:Lastname,
     userName:Username,
     profileImage:Image,
     email:Email,
     dob: Dob,
     gender:Gender,
     mobile:Mobile,
     position:pos,
     hospital:hos,

     experiance:exp,
     reference:ref


  });


  fac.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/facilityadm/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      facilityAdmin.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/facilityadm/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    facilityAdmin.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
