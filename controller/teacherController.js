const teacherController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

teacherController.createTeacher = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  let userRole = req.body.role;
  teacherName =
    req.body.teacherUniversityId =
    req.body.teacherEmail =
    req.body.teacherphoneNumber =
      req.body.phone_number;
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
};

teacherController.getTeachers = async (req, res) => {
  await db.teacher
    .findAll()
    .then((data) => {
      if (data !== null) {
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
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = teacherController;
