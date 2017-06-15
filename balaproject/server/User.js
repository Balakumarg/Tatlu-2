var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    firstName: String,
    coverPic:String,
    userName: String,
    mobile: String,
    email: String,
     id:String,
  UserType: String,
  profileImage:String,
    Password: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

module.exports = mongoose.model('User', userSchema, 'User');
