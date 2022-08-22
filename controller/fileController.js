const fileController = {};
const db = require("../utils/db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const config = process.env;
const fs = require("fs");

const configSpecial = {
  courseInsertable: false
};

fileController.updateConfig = async (req, res, next) => {
  const configSpecial = {
    courseInsertable: req.body.data
  };
  fs.writeFile("configSpecial.json", JSON.stringify(configSpecial), (err) => {
    if (err) throw res.status(500).send(err);
    return next();
  });
};

fileController.getConfig = async (req, res) => {
  fs.readFile("configSpecial.json", (err, data) => {
    if (err) throw res.status(500).send(err);
    const loadedUsers = JSON.parse(data);
    res.status(200).json(loadedUsers);
  });
};

module.exports = fileController;
