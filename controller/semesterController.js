const semesterController = {};
const db = require("../utils/db");
const enumData = require("../CONSTANTS/enums");

semesterController.createSemester = async (req, res) => {
  let teacherName = req.body.name;
  let teacherDesignation = req.body.designation;
  let teacherPhoneNumber = req.body.phone;
  if (
    !enumData.semesterName.includes(semesterName) ||
    !"/^d{4}$/".test(semesterYear)
  ) {
    res.status(400).json({ status: "Bad Request" }); //
  } else {
    await db.semester
      .create({
        name: semesterName.trim().toLowerCase(),
        year: semesterYear.trim().toUpperCase()
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
};
semesterController.getSemesters = async (req, res) => {
  await db.semester
    .findAll({ order: ["year"] })
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
module.exports = semesterController;
