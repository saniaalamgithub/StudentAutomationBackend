const studentController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;
const bcrypt = require("bcrypt");

studentController.createStudent = async (req, res) => {
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
  } else {
    let userPassword = await bcrypt.hashSync(
      req.body.password.trim(),
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
          password: req.body.password
        },
        {
          where: {
            email: req.verifiedUser.email
          }
        }
      )
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
    await db.student
      .create({
        name: req.body.student.name,
        university_student_id: req.body.student.id,
        phone_number: req.body.student.phoneNumber,
        user: {
          email: req.body.email,
          password: userPassword,
          role: "STUDENT",
          secret_code: secretkey,
          is_active: true
        },
        userUserId: 2,
        departmentDepartmentId: 3,
        semesterSemesterId: 2
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

module.exports = studentController;
