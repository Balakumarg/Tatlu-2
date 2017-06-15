var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var DoctorSchema = mongoose.Schema({
        id:String,
     firstName:String,
     lastName:String,
     userName:String,
     profileImage:String,
     email:String,
     facilityName:String,
     dob:String,
     gender:String,
     mobile:String,
     facebook:String,
     twitter:String,
     google:String,
     Speciality: String

    });

var Doctor = mongoose.model('Doctor', DoctorSchema, 'Doctor_collection');




router.get('/doctor', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Doctor.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/doctor/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Doctor.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/doctor', function(req, res){
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
      var Facebook = req.body.facebook;
      var faci = req.body.facilityName;

      var Twitter = req.body.twitter;
      var Google = req.body.google;
        var Special = req.body.Speciality;





   var doctor1 = new Doctor({
     id:Id,
     firstName:Firstname,
     lastName:Lastname,
     userName:Username,
     profileImage:Image,
     email:Email,
     dob: Dob,
     gender:Gender,
     facilityName:faci,
     mobile:Mobile,
     facebook:Facebook,
     twitter:Twitter,
     google:Google,
     Speciality: Special

  });


  doctor1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/doctor/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Doctor.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/doctor/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Doctor.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
