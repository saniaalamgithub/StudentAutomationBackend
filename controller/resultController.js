const resultController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;



resultController.getResults= async (req, res) => {
  await db.result.findAll({ })
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

resultController.getResultByStudent= async (req, res) => {
    await db.result.findAll({ })
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



module.exports = resultController;