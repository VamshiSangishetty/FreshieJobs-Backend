const mongoose=require("mongoose")

const expoTokenSchema = mongoose.Schema({
    token: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model("ExpoToken", expoTokenSchema);