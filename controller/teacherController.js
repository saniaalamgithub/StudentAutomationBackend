const teacherController = {};
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

teacherController.createTeacher = async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.pass;
  console.log(req.file + "------", req.body.phoneNumber);
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
      return;
    });

  if (!validator.isEmail(userEmail.trim())) {
    res.status(400).json({ status: "Bad Request" }); //
    return;
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
      .update(
        {
          email: userEmail.trim().toLowerCase(),
          password: userPassword,
          secret_code: secretkey,
          is_active: true
        },
        {
          where: {
            user_id: req.verifiedUser.id
          }
        }
      )
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
        return;
      });

    // await db.user
    //   .create({
    //     email: userEmail.trim().toLowerCase(),
    //     password: userPassword,
    //     role: userRole.trim().toUpperCase(),
    //     secret_code: secretkey
    //   })
    //   .then((data) => {
    //     res.status(200).json(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     res.status(500).send(error);
    //   });
  }

  await db.teacher
    .create({
      name: req.body.name,
      phone_number: Number(req.body.phoneNumber),
      filePath: req.file?.filename,
      designation: req.body.designation,
      userUserId: req.verifiedUser.id,
      departmentDepartmentId: req.body.department
    })
    .then((data) => {
      res.status(200).json({
        status: "Done"
      });
      return;
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
      return;
    });
};

teacherController.getTeachers = async (req, res) => {
  await db.teacher
    .findAll({
      include: [
        {
          model: db.department
        },
        {
          model: db.section,
          include: [
            {
              model: db.course
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

teacherController.getOneTeacher = async (req, res) => {
  await db.user
    .findOne({
      where: {
        email: req.verifiedUser.email
      },
      include: [
        {
          model: db.teacher,
          include: [
            {
              model: db.section,
              include: [
                {
                  model: db.course
                },
                {
                  model: db.notice
                },
                {
                  model: db.classEvent
                },
                {
                  model: db.courseTaken,
                  include: [
                    {
                      model: db.student
                    },
                    {
                      model: db.section,
                      include: [
                        {
                          model: db.course
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              model: db.complain
            },
            {
              model: db.user
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

teacherController.getTeachersCourseList = async (req, res) => {
  await db.teacher
    .findByPk(req.params.id, {
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

teacherController.takeAttendence = async (req, res) => {
  await db.attendence
    .bulkCreate(req.body.attendenceData, {
      updateOnDuplicate: ["attendence_id", "is_present"]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Insertion Failed"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

teacherController.getAttendence = async (req, res) => {
  await db.attendence
    .findAll({
      where: { sectionSectionId: req.params.secId, date: req.body.date },
      include: [
        {
          model: db.student
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

module.exports = teacherController;
