var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var fecilitySchema = mongoose.Schema({
  Type:Array,
  SelectedType:String,
  id:String,
    Name:String,
    Address:String,
    City:String,
    State:String,
    Country:String,
    Website:String,
    Phone:String,
    Fax:String,
    ZipCode:String,
    TaxId:String,
    FacilityNPI:String,
    Email:String,
    Color:String,
    BillingLoc:Boolean,
    ServiceLoc:Boolean


    });

var Facility = mongoose.model('Facility', fecilitySchema, 'aaTable');




router.get('/facility', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Facility.find({}, function (err, docs) {
         res.json(docs);


    });
});

router.get('/facility/:id', function (req, res) {
     Facility.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/facility', function(req, res){
  console.log(req.body);

  var type = req.body.Type;
  var Id = req.body.id;
  var selected = req.body.SelectedType;
  var name = req.body.Name;
  var address = req.body.Address;
  var city = req.body.City;
  var state = req.body.State;
  var country = req.body.Country;
  var web = req.body.Website;
  var phone = req.body.Phone;
  var fax = req.body.Fax;
  var zip = req.body.ZipCode;
  var tax = req.body.TaxId;
  var facnpi = req.body.FacilityNPI;
  var mail = req.body.Email;
  var color = req.body.Color;
  var billLoc = req.body.BillingLoc;
  var service = req.body.ServiceLoc;







   var fecility1 = new Facility({
     Type:type,
     id:Id,
     SelectedType:selected,
     Name:name,
     Address:address,
     City:city,
     State:state,
     Country:country,
     Website:web,
     Phone:phone,
     Fax:fax,
     ZipCode:zip,
     TaxId:tax,
     FacilityNPI:facnpi,
     Email:mail,
     Color:color,
     BillingLoc:billLoc,
     ServiceLoc:service
  });


  fecility1.save(function(err, docs){
    if ( err ) throw err;
    console.log("HIIIIIIII Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/facility/:id', function(req, res){
      Facility.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/facility/:id', function(req, res){
    console.log(req.body);
    Facility.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
