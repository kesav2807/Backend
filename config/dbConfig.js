const mongoose = require("mongoose");

const connection = mongoose.connect(
  `mongodb+srv://kesav2807:Raji2807@cluster0.4k1tgsi.mongodb.net/TMSAPP`
);

try {
  console.log(`Database Connected!`);
} catch (error) {
  console.log(error);
}

module.exports = connection;
