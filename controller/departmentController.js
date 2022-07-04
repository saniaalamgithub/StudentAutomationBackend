const departmentController = {};
const db = require("../utils/db");

departmentController.createDepartment = async (req, res) => {
  let deptName = req.body.name;
  let deptShortCode = req.body.short_code;
  await db.department
    .create({
      name: deptName.trim().toLowerCase(),
      short_code: deptShortCode.trim().toUpperCase()
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
departmentController.getDepartments = async (req, res) => {
  await db.department
    .findAll()
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
module.exports = departmentController;
