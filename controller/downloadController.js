const downloadController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;

downloadController.downloadFile = async (req, res) => {
  const fileName = req.body.path;
  const directoryPath = "uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err
      });
    }
  });
};

module.exports = downloadController;
