const resultController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

const getGPA = (mark) => {
  if (mark > 100 || mark < 0) {
    return -1;
  } else if (mark >= 90) {
    return 4;
  } else if (mark >= 87) {
    return 3.7;
  } else if (mark >= 84) {
    return 3.4;
  } else if (mark >= 80) {
    return 3.1;
  } else if (mark >= 77) {
    return 2.8;
  } else if (mark >= 74) {
    return 2.5;
  } else if (mark >= 70) {
    return 2.2;
  } else if (mark >= 65) {
    return 1.5;
  } else if (mark >= 60) {
    return 1;
  }
};

resultController.getResults = async (req, res) => {
  await db.result
    .findAll({})
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

resultController.getResultByCourse = async (req, res) => {
  await db.result
    .findAll({
      where: {
        courseCourseId: req.params.id
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

resultController.getResultByStudent = async (req, res) => {
  await db.result
    .findAll({
      where: {
        studentStudentId: req.studentId
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

resultController.createResult = async (req, res, next) => {
  let insertableData = [];

  req.body.data.forEach((element) => {
    let temp = {};
    let totalMark =
      Number(element.studentResult1stTerm) +
      Number(element.studentResultMidTerm) +
      Number(element.studentResultFinal) +
      Number(element.studentResultAssignment) +
      Number(element.studentResultQuiz) +
      Number(element.studentResultAttendence);
    temp.grade = getGPA(totalMark);
    temp.studentStudentId = element.studentStudentId;
    temp.courseCourseId = element.courseId;
    insertableData.push(temp);
  });
  await db.result
    .bulkCreate(insertableData)
    .then((data) => {
      if (data !== null) {
        req.resultInsertion = true;
        return next();
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

resultController.removeSection = async (req, res) => {
  if (req.resultInsertion) {//double checking that result is submitted
    await db.attendence.destroy({
      where: { sectionSectionId: req.body.data[0].sectionSectionId }
    });
    await db.notice.destroy({
      where: { sectionSectionId: req.body.data[0].sectionSectionId }
    });
    await db.message.destroy({
      where: { sectionSectionId: req.body.data[0].sectionSectionId }
    });
    await db.classEvent.destroy({
      where: { sectionSectionId: req.body.data[0].sectionSectionId }
    });
    await db.courseTaken.destroy({
      where: { sectionSectionId: req.body.data[0].sectionSectionId }
    });
    await db.section.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);//force delete even if foreign key constrait found
    await db.section
      .destroy({
        where: { section_id: req.body.data[0].sectionSectionId }
      })
      .then((data) => {
        if (data !== null) {
          res.status(200).json({ suceess: "true" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
    await db.section.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
  }
};

module.exports = resultController;
