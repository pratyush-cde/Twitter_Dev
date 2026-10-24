const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUNDS } = require("../config/serverConfig");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
