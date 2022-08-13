const eventController = {};
const db = require("../utils/db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const config = process.env;

eventController.createEvent = async (req, res) => {
  console.log(req.body.id);
  if (req.body.id === 0) {
    await db.classEvent
      .create({
        date: req.body.date,
        role: req.body.role,
        sectionSectionId: req.body.sectionId
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
    await db.classEvent
      .update(
        {
          class_event_id: req.body.id,
          date: req.body.date,
          role: req.body.role,
          sectionSectionId: req.body.sectionId
        },
        {
          where: {
            class_event_id: req.body.id
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

eventController.getEvent = async (req, res) => {
  await db.classEvent
    .findAll({
      where: {
        sectionSectionId: req.params.id
      },
      order: [["date", "DESC"]]
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

eventController.deleteEvent = async (req, res) => {
  console.log(req.params.id);
  await db.classEvent
    .destroy({
      where: {
        class_event_id: req.params.id
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

module.exports = eventController;
