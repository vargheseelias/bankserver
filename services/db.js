const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bankserver", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const user = mongoose.model('user', {
  acno: Number,
  name: String,
  balance: Number,
  password: String,
});

module.exports = {
  user,
};
