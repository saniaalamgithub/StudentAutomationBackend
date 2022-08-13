const complainController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

complainController.createComplain = async (req, res) => {
  console.log(req.body.id);
  if (req.body.id === 0) {
    await db.complain
      .create({
        date: req.body.date,
        content: req.body.content,
        notify_parent: req.body.notify_parent,
        studentStudentId: req.body.studentId,
        teacherTeacherId: req.body.teacherId
      })
      .then((data) => {
        if (data !== null) {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.log("err", error);
        res.status(500).send(error);
      });
  } else {
    await db.complain
      .update(
        {
          complain_id: req.body.id,
          date: req.body.date,
          content: req.body.content,
          notify_parent: req.body.notify_parent,
          studentStudentId: req.body.studentId,
          teacherTeacherId: req.body.teacherId
        },
        {
          where: {
            complain_id: req.body.id
          }
        }
      )
      .then((data) => {
        if (data !== null) {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        console.log("err", error);
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

complainController.getNoticesForStudents = async (req, res) => {
  await db.complain
    .findAll({
      where: {
        studentStudentId: req.body.ids
      },
      include: [
        {
          model: db.student
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

complainController.deleteComplain = async (req, res) => {
  console.log(req.params.id);
  await db.complain
    .destroy({
      where: {
        complain_id: req.params.id
      }
    })
    .then((data) => {
      if (data !== null) {
        res.status(200).json(data);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = complainController;
