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
    await db.user
      .findOne({
        where: { email: userEmail }
      })
      .then((data) => {
        if (data === null) {
          res.status(404).json({
            status: "Not found"
          });
        } else {
          if (bcrypt.compare(userPassword.trim(), data.password))
            console.log(data);
          const token = jwt.sign(
            { id: data.user_id, email: data.email, role: data.role, active: data.is_active },
            process.env.TOKEN_KEY,
            {
              expiresIn: "12h"
            }
          );
          res.status(200).json({ token: token, role: data.role, active: data.is_active });
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
    await db.user
      .findOne({
        where: { email: userEmail.trim().toLowerCase() }
      })
      .then((data) => {
        if (data !== null) {
          res.status(409).json({
            status: "User already exist with that email address"
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
      await db.user
        .create({
          email: userEmail.trim().toLowerCase(),
          password: userPassword,
          role: userRole.trim().toUpperCase(),
          secret_code: secretkey
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

userController.getUsers = async (req, res) => {
  await db.user
    .findAll()
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          status: "Not Found"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: "YInternal Server Error" });
    });
};

userController.sayHello = async (req, res) => {
  res.status(200).send(req.verifiedUser.role);
};

module.exports = userController;
