const guardianController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const bcrypt = require("bcrypt");

guardianController.getWardInfo = async (req, res) => {
  if (req.verifiedUser.role === enumData.user[3]) {
    await db.user
      .findByPk(req.verifiedUser.id, {
        include: [
          {
            model: db.guardian,
            include: [
              {
                model: db.student,
                include: [
                  {
                    model: db.courseTaken,
                    include: [
                      {
                        model: db.section,
                        include: [
                          {
                            model: db.course
                          }
                        ]
                      }
                    ]
                  },
                  {
                    model: db.result,
                    include: [
                      {
                        model: db.course
                      }
                    ]
                  },
                  {
                    model: db.complain
                  },
                  {
                    model: db.department
                  },
                  {
                    model: db.semester
                  }
                ]
              }
            ]
          }
        ]
      })
      .then((data) => {
        if (data == null) {
          res.status(404).json({
            status: "Not Found"
          });
        } else {
          //   let result = secondaryTask(data);
          res.status(200).json({
            data
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(401).json({ status: "You are not authorized to see this page" });
  }
};

guardianController.addGuardian = async (req, res) => {
  userPassword = await bcrypt.hashSync(
    req.password,
    bcrypt.genSaltSync(Number(config.SALT_ROUND))
  );
  userSecret = await bcrypt.hashSync(
    req.email,
    bcrypt.genSaltSync(Number(config.SALT_ROUND))
  );
  await db.user
    .create({
      email: req.email,
      password: userPassword,
      role: enumData.user[3],
      secret_code: userSecret,
      is_active: true,
      guardian: {
        name: req.name,
        phone_number: req.number
      }
    })
    .then(() => {
      console.log(`New Guardian Added`);
    })
    .catch((error) => {
      return console.error(error);
    });
};

guardianController.getGuardians = async (req, res) => {
  await db.student
    .findAll({
      include: [
        {
          model: db.guardian
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

secondaryTask = async (data, res) => {
  await db.guardian.findOne({
    where: { user: data },
    include: [
      {
        model: db.student
      }
    ]
  });
};

module.exports = guardianController;
