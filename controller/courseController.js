const courseController = {};
const db = require("../utils/db");

courseController.getCourse = async (req, res) => {
  await db.course
    .findAll({
      include: [
        {
          model: db.section,
          include: [
            {
              model: db.teacher
            },
            {
              model: db.course
            },
            {
              model: db.timeslot
            },
            {
              model: db.courseTaken,
              include: [
                {
                  model: db.student
                }
              ]
            }
          ]
        },
        {
          model: db.department
        }
      ]
    })
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
      console.log(error);
      res.status(500).send(error);
    });
};

courseController.createCourse = async (req, res) => {
  await db.course
    .create({
      name: req.body.name,
      short_code: req.body.short_code,
      credit: req.body.credit,
      is_offered: req.body.active,
      departmentDepartmentId: Number(req.body.department)
    })
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
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = courseController;
