var express = require('express');
var router = express.Router();
var User = require('../User.js');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    var newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.userName = req.body.userName;
    newUser.mobile = req.body.mobile;
    newUser.email = req.body.email;
    newUser.id = req.body.id;
    newUser.UserType = req.body.UserType;
    newUser.profileImage = req.body.profileImage;
    newUser.coverPic = req.body.coverPic;
    newUser.Password = newUser.generateHash(req.body.Password);
    newUser.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            });
            console.log(' Called');
        }
    });
});

router.post('/login', function(req, res) {
    User.findOne({
        id: req.body.id
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong user id'
            });
            console.log('Wrong user');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log('Toke Created');
        }
    });
});
router.put('/update/:id', function(req, res){
  User.findOne({
      id: req.body.id
  },function(err, profile) {
      if (err) {
          res.json(err);
      } else if (!profile) {
          res.json({
              success: false,
              message: 'Sorry wrong user id'
          });
          console.log('Wrong user');
      } else if (!profile.validPassword(req.body.currentPassword)) {
          res.json({
              success: false,
              message: 'Sorry wrong password'
          });
          console.log('Wrong Password');
      }else if (profile) {

profile.Password = profile.generateHash(req.body.Password);

        User.findOneAndUpdate({_id:req.params.id}, profile, function (err, data) {
          res.json(data);
        });

          console.log('Pass word changed');
      }
   });
})

router.put('/updateDetails/:id', function(req, res){
    console.log(req.body);
    User.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})


router.get('/getuser', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

  User.find({}, function (err, docs) {
         res.json(docs);
        //  console.log(docs);

    });
});

module.exports = router;
