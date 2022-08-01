const complainController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

complainController.createComplain = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  let userRole = req.body.role;
  complainName =
    req.body.complainUniversityId =
    req.body.complainEmail =
    req.body.complainphoneNumber =
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

complainController.getComplains = async (req, res) => {
  await db.complain
    .findAll({
      include: [
        {
          model: db.student
        },
        {
          model: db.teacher,
          include: [
            {
              model: db.department
            }
          ]
        }
      ]
    })
    .then((data) => {
      if (data === null) {
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

module.exports = complainController;
