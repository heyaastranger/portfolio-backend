const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactInfo = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailID: { type: String, required: true },
  Message: { type: String },
});

module.exports = mongoose.model("ContactInfo", ContactInfo);
