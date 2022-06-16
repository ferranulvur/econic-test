const mongoose = require("mongoose");
require("dotenv").config();

exports.makeDb = () => {
  console.log(process.env.MONGO_URL);
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    // Update here mongodb access credential
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  mongoose.set("useFindAndModify", false);
};