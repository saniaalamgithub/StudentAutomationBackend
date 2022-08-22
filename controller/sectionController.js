const sectionController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;
sectionController.getSection = async (req, res) => {
  await db.section
    .findAll({
      where: {
        section_id: req.params.id
      },
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
sectionController.addSectionsToStudent = async (req, res) => {
  let insertable = [];
  req.body.sIds.forEach((element) => {
    let temp = {
      sectionSectionId: Number(element),
      studentStudentId: req.studentId
    };
    insertable.push(temp);
  });
  console.log(insertable);
  await db.courseTaken
    .bulkCreate(insertable)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = sectionController;
