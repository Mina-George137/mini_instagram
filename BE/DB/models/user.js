const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    userName:{
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  this.password = this.password+this._id+process.env.PEPPER ;
  this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT));
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, storedPassword) {
  candidatePassword = candidatePassword+this._id+process.env.PEPPER;
  return await bcrypt.compare(candidatePassword, storedPassword);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;