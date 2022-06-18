const userController = {};
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

userController.tryLogin = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  if (validator.isEmail(userEmail.trim())) {
    userEmail = userEmail.trim().toLowerCase();
    await db.users
      .findOne({
        where: { email: userEmail },
      })
      .then((data) => {
        if (data === null) {
          res.status(404).json({
            status: "Not found",
          });
        } else {
          bcrypt.compare(
            userPassword.trim(),
            data.password,
            function (err, result) {
              if (result == true) {
                const token = jwt.sign(
                  { email: data.email, role: data.role },
                  process.env.TOKEN_KEY,
                  {
                    expiresIn: config.TOKEN_LIFE,
                  }
                );
                res.status(200).json({ token: token });
              } else {
                res.status(403).json({
                  status: "Emal/password mismatch",
                });
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(400).json({ status: "Bad Request" });
  }
};

userController.createUser = async (req, res) => {
  if (req.verifiedUser.role == enumData.user[0]) {
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    let userRole = req.body.role;
    await db.users
      .findOne({
        where: { email: userEmail.trim().toLowerCase() },
      })
      .then((data) => {
        if (data !== null) {
          res.status(409).json({
            status: "User already exist with that email address",
          });
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
    if (
      !validator.isEmail(userEmail.trim()) ||
      !enumData.user.includes(userRole.toUpperCase())
    ) {
      res.status(400).json({ status: "Bad Request" }); //
    } else {
      userPassword = await bcrypt.hashSync(
        userPassword.trim(),
        bcrypt.genSaltSync(Number(config.SALT_ROUND))
      );
      let secretkey = await bcrypt.hashSync(
        userEmail.trim().toLowerCase(),
        bcrypt.genSaltSync(Number(config.SALT_ROUND))
      );
      await db.users
        .create({
          email: userEmail.trim().toLowerCase(),
          password: userPassword,
          role: userRole.trim().toUpperCase(),
          secret_code: secretkey,
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    }
  } else {
    res.status(401).json({ status: "You are not authorized to do this task" });
  }
};

userController.sayHello = async (req, res) => {
  res.status(200).send(req.verifiedUser.role);
};

module.exports = userController;
