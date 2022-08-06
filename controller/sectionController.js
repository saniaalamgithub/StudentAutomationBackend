const sectionController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const { section } = require("../utils/db");
const config = process.env;

// {
//     include:[
//         {
//             model:db.course
//         }
//     ]
//   }
sectionController.getSection = async (req, res) => {
  await db.section
    .findAll({
      where: {
        timeslotTimeslotId: "2",
      },
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found",
        });
      } else {
        res.status(200).json({
          data,
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
          model: db.course,
        },
      ],
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Not Found",
        });
      } else {
        res.status(200).json({
          data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

module.exports = sectionController;
