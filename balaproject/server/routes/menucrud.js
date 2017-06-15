var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
// var mongoose = require('mongoose');

var menuSchema = mongoose.Schema({
        icon:String,
        path:String,
     menuName:String,
     age:String,
     submenu:{menuname:String}


    });

var Menu = mongoose.model('Menu', menuSchema, 'Menu_collection');




router.get('/menu', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Menu.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

router.get('/menu/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Menu.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/menu', function(req, res){
  console.log(req.body);


  var Id = req.body.icon;
  var Path = req.body.path;

    var menu = req.body.menuName;
    var Age = req.body.age;



   var menuContent = new Menu({
     icon:Id,
     path:Path,
     menuName:menu,
     age:Age

  });


  menuContent.save(function(err, docs){
    if ( err ) throw err;
    console.log("Type Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/menu/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Menu.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/menu/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Menu.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})




router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
