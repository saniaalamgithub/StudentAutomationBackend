const adminController = {};
const db = require("../utils/db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const config = process.env;

adminController.updateAdmin = async (req, res) => {
  let oldData;
  await db.user
    .findOne({
      where: { email: req.verifiedUser.email }
    })
    .then((data) => {
      if (data !== null) {
        oldData = data;
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });

  if (validator.isEmail(req.body.email.trim())) {
    updatedUser = {};
    updatedUser.email = req.body.email.trim().toLowerCase();
    updatedUser.password = bcrypt.hashSync(
      req.body.password.trim(),
      bcrypt.genSaltSync(Number(config.SALT_ROUND))
    );
    console.log(updatedUser);
    await db.user
      .update(updatedUser, {
        where: {
          email: req.verifiedUser.email
        }
      })
      .then((data) => {
        if (data == null) {
          res.status(404).json({
            status: "Not Found"
          });
        } else {
          res.status(201).json({
            data
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(404).json({
      status: "Invalid Email"
    });
  }
};

module.exports = adminController;
