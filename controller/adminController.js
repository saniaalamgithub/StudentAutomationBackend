const adminController = {};
const db = require("../utils/db");
var validator = require("validator");

adminController.updateAdmin = async (req, res) => {
  let oldData;
  await db.user
    .findOne({
      where: { email: req.body.email.trim().toLowerCase() },
    })
    .then((data) => {
      if (data !== null) {
        oldData = data;
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });

    if(validator.isEmail(req.body.email.trim())){
        oldData.email = req.body.email
        oldData.password = req.body.password
        await db.user
    .update(oldData)
    .then((data) => {
      if (data == null) {
        res.status(404).json({
          status: "Not Found",
        });
      } else {
        res.status(201).json({
          data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
    } else {
        res.status(404).json({
            status: "Invalid Email",
          });
    }
};

module.exports = adminController;
