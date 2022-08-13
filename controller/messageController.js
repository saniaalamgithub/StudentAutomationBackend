const messageController = {};
const db = require("../utils/db");
var validator = require("validator");
const bcrypt = require("bcrypt");
const config = process.env;

// messageController.createMessage = async (req, res) => {
//   console.log(req.body.id);
//   if (req.body.id === 0) {
//     await db.classEvent
//       .create({
//         date: req.body.date,
//         role: req.body.role,
//         sectionSectionId: req.body.sectionId
//       })
//       .then((data) => {
//         if (data !== null) {
//           res.status(200).json(data);
//         }
//       })
//       .catch((error) => {
//         console.log("err", error);
//         res.status(500).send(error);
//       });
//   } else {
//     await db.classEvent
//       .update(
//         {
//           class_message_id: req.body.id,
//           date: req.body.date,
//           role: req.body.role,
//           sectionSectionId: req.body.sectionId
//         },
//         {
//           where: {
//             class_message_id: req.body.id
//           }
//         }
//       )
//       .then((data) => {
//         if (data !== null) {
//           res.status(200).json(data);
//         }
//       })
//       .catch((error) => {
//         console.log("err", error);
//         res.status(500).send(error);
//       });
//   }
// };

messageController.getMessages = async (req, res) => {
  await db.message
    .findAll({
      where: {
        sectionSectionId: req.params.id
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.teacher
            },
            {
              model: db.student
            }
          ]
        }
      ]
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

module.exports = messageController;
