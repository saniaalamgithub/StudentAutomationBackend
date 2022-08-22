const studentController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;
const bcrypt = require("bcrypt");
studentController.createStudent = async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ status: "Bad Request Email" }); //
    return;
  }

  //error if email already exist
  await db.user
    .findOne({
      where: { email: req.body.email.trim().toLowerCase() }
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

  if (!validator.isEmail(req.body.email.trim())) {
    res.status(400).json({ status: "Bad Request" }); //
    return;
  } else {
    let userPassword = await bcrypt.hashSync(
      req.body.pass.trim(),
      bcrypt.genSaltSync(Number(config.SALT_ROUND))
    );
    let secretkey = await bcrypt.hashSync(
      req.body.email.trim().toLowerCase(),
      bcrypt.genSaltSync(Number(config.SALT_ROUND))
    );
    await db.user
      .update(
        {
          email: req.body.email.trim().toLowerCase(),
          password: userPassword,
          secret_key: secretkey,
          is_active: true
        },
        {
          where: {
            email: req.verifiedUser.email
          }
        }
      )
      .then((data) => {
        console.log("user updated ", data);

        // res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });

    await db.student
      .create({
        name: req.body.name,
        university_student_id: req.body.studentId,
        filePath: req.file?.filename,
        phone_number: req.body.phoneNumber,
        userUserId: req.verifiedUser.id,
        guardianGuardianId: req.guardianId,
        departmentDepartmentId: Number(req.body.department),
        semesterSemesterId: Number(req.body.joinedAt)
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

studentController.getStudents = async (req, res) => {
  await db.student
    .findAll({
      include: [
        {
          model: db.department,
          include: [
            {
              model: db.teacher
            }
          ]
        },
        {
          model: db.semester
        },
        {
          model: db.guardian
        },
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

studentController.getStudentAndCourse = async (req, res) => {
  await db.student.findByPk(req.params.id, {
    include: [
      {
        model: db.courseTaken
      }
    ]
  });
};

studentController.getOneStudent = async (req, res) => {
  await db.user
    .findOne({
      where: {
        email: req.verifiedUser.email
      },
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
                    },
                    {
                      model: db.notice
                    },
                    {
                      model: db.teacher
                    },
                    {
                      model: db.classEvent
                    },
                    {
                      model: db.timeslot
                    },
                    {
                      model: db.attendence
                    }
                  ]
                }
              ]
            },
            {
              model: db.department
            },
            {
              model: db.semester
            },
            {
              model: db.user
            },
            {
              model: db.result,
              include: [
                {
                  model: db.course
                }
              ]
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

studentController.getStudentFromUserId = async (req, res, next) => {
  await db.user
    .findOne({
      where: {
        email: req.verifiedUser.email
      },
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
        req.studentId = data.student.student_id;
        return next();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = studentController;
