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

adminController.endSemester = async (req, res) => {
  await db.attendence.truncate({ cascade: true });

  await db.notice.truncate({ cascade: true });

  await db.message.truncate({ cascade: true });

  await db.classEvent.truncate({ cascade: true });

  await db.courseTaken.truncate({ cascade: true });

  await db.section.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
  await db.section
    .truncate({ cascade: true })
    .then((data) => {
      if (data !== null) {
        res.status(200).json({ suceess: "true" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
  await db.section.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
};

module.exports = adminController;
