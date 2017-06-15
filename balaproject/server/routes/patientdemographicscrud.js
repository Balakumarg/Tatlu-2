var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var PatientdemoSchema = mongoose.Schema({
        id:String,
    firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  aadhaarno: String,
  licenseno: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  fathername: String,
  mothername: String,
  spousename: String,
  guardiansname: String,
  homeno: String,
  cellno: String,
  workno: String,
  email: String,
  emgname: String,
  emgphoneno: String,
  familydocname: String,
  referdocname: String,
  prefphar: String,
  preflab: String,
  allowsms: String,
  allowemail: String,
  occupation: String,
  employername: String,
  typeindustry: String,
  employeraddress: String,
  employercity: String,
  employerstate: String,
  language: String,
  religion: String,
  monthlyincome: String,
  familysize: String,
  referralsource: String,
  insuranceplanname: String,
  policynumber: String

    });

var Patientdemo = mongoose.model('Patientdemo', PatientdemoSchema, 'Patient_collection');




router.get('/patientdemo', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Patientdemo.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/patientdemo/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Patientdemo.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/patientdemo', function(req, res){
  console.log(req.body);

   var Id = req.body.id;
    var FirstName = req.body.firstName;
    var LastName = req.body.lastName;
    var Dob = req.body.dob;
    var Gender = req.body.gender;
    var Aadhaarno = req.body.aadhaarno;
    var Licenseno = req.body.licenseno;
      var Address = req.body.address;
      var City = req.body.city;
      var State = req.body.state;
      var Pincode = req.body.pincode;
      var Fathername = req.body.fathername;
      var Mothername = req.body.mothername;
      var Spousename = req.body.spousename;
      var Guardiansname = req.body.guardiansname;
      var  Homeno= req.body.homeno;
        var Cellno = req.body.cellno;
        var Workno = req.body.workno;
        var Email = req.body.email;
        var Emgname = req.body.emgname;
        var Emgphoneno = req.body.emgphoneno;
        var Familydocname = req.body.familydocname;
        var Referdocname = req.body.referdocname;
        var Prefphar = req.body.prefphar;
        var Preflab = req.body.preflab;
          var Allowsms = req.body.allowsms;
          var Allowemail = req.body.allowemail;
          var Occupation = req.body.occupation;
          var Employername = req.body.employername;
          var Typeindustry = req.body.typeindustry;
          var Employeraddress = req.body.employeraddress;
          var Employercity = req.body.employercity;
          var Employerstate = req.body.employerstate;
          var Language = req.body.language;
            var Religion = req.body.religion;
            var Monthlyincome = req.body.monthlyincome;
            var Familysize = req.body.familysize;
            var Referralsource = req.body.referralsource;
            var Insuranceplanname = req.body.insuranceplanname;
            var Policynumber = req.body.policynumber;



   var patientdemo1 = new Patient({
     id:Id,
     firstName: FirstName,
     lastName: LastName,
     dob: Dob,
     gender: Gender,
     aadhaarno: Aadhaarno,
     licenseno: Licenseno,
     address: Address,
     city: City,
     state: State,
     pincode: Pincode,
     fathername: Fathername,
     mothername: Mothername,
     spousename: Spousename,
     guardiansname: Guardiansname,
     homeno: Homeno,
     cellno: Cellno,
     workno: Workno,
     email: Email,
     emgname: Emgname,
     emgphoneno: Emgphoneno,
     familydocname: Familydocname,
     referdocname: Referdocname,
     prefphar: Prefphar,
     preflab: Preflab,
     allowsms: Allowsms,
     allowemail: Allowemail,
     occupation: Occupation,
     employername: Employername,
     typeindustry: Typeindustry,
     employeraddress: Employeraddress,
     employercity: Employercity,
     employerstate: Employerstate,
     language: Language,
     religion: Religion,
     monthlyincome: Monthlyincome,
     familysize: Familysize,
     referralsource: Referralsource,
     insuranceplanname: Insuranceplanname,
     policynumber: Policynumber

  });


  patientdemo1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/patientdemo/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Patientdemo.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/patientdemo/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Patientdemo.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
