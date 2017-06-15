var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var MembershipSchema = mongoose.Schema({
      membershipid:String,
      membershipType:String,
     leadid:String,
  totalMembers:String,
  members:Array

    });

var Member = mongoose.model('Member', MembershipSchema, 'member_collection');




router.get('/member', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Member.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/member/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Member.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/member', function(req, res){
  console.log(req.body);


  var mid = req.body.membershipid;
    var mtype = req.body.membershipType;
    var lid = req.body.leadid;
    var totalmem = req.body.totalMembers;
    var mem = req.body.members;


   var mem1 = new Member({
     membershipid:mid,
     membershipType:mtype,
     leadid:lid,
     totalMembers:totalmem,
     members:mem

  });


  mem1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/member/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Member.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/member/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Member.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
