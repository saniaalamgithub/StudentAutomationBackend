const sectionController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;
sectionController.getSection = async (req, res) => {
  await db.section
    .findAll({
      where: {
        timeslotTimeslotId: "2"
      }
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
sectionController.getSections = async (req, res) => {
  await db.section
    .findAll({
      include: [
        {
          model: db.course
        },
        {
          model: db.teacher
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
sectionController.createSection = async (req, res) => {
  await db.section
    .create({
      section_name: req.body.name,
      timeslotTimeslotId: req.body.timeslot_id,
      courseCourseId: req.body.course_id,
      teacherTeacherId: req.body.teacher_id
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = sectionController;
