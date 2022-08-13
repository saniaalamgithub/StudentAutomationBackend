const noticeController = {};
const db = require("../utils/db");
var validator = require("validator");
var enumData = require("../CONSTANTS/enums");
const config = process.env;
const { Op } = require("sequelize");

noticeController.createNotice = async (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let filePath = req.file;
  if (req.body.id === undefined || req.body.id === null || req.body.id == 0) {
    await db.notice
      .create({
        title: title.trim().toLowerCase(),
        content: content.trim().toUpperCase(),
        filePath: filePath?.filename,
        sectionSectionId: req.body.sectionSectionId,
        userUserId: req.verifiedUser.id
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    await db.notice
      .update(
        {
          notice_id: req.body.id,
          title: title.trim().toLowerCase(),
          content: content.trim().toUpperCase(),
          filePath: filePath?.filename,
          sectionSectionId: req.body.sectionSectionId,
          userUserId: req.verifiedUser.id
        },
        {
          where: {
            notice_id: req.body.id
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

noticeController.getNotices = async (req, res) => {
  await db.notice
    .findAll({
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.teacher,
              include: [
                {
                  model: db.department
                }
              ]
            }
          ]
        },
        {
          model: db.section,
          include: [
            {
              model: db.course
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

noticeController.getNoticesForSection = async (req, res) => {
  await db.notice
    .findAll({
      where: {
        [Op.or]: [
          { sectionSectionId: null },
          { sectionSectionId: req.params.id }
        ]
      },
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.teacher,
              include: [
                {
                  model: db.department
                }
              ]
            }
          ]
        },
        {
          model: db.section,
          include: [
            {
              model: db.course
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

noticeController.getOneNotice = async (req, res) => {
  await db.user
    .findOne({
      where: {
        email: req.verifiedUser.email
      },
      include: [
        {
          model: db.notice,
          include: [
            {
              model: db.section,
              include: [
                {
                  model: db.course
                },
                {
                  model: db.notice
                },
                {
                  model: db.courseTaken,
                  include: [
                    {
                      model: db.student
                    }
                  ]
                }
              ]
            },
            {
              model: db.complain
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

noticeController.getNoticesCourseList = async (req, res) => {
  await db.notice
    .findByPk(req.params.id)
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

noticeController.deleteNotice = async (req, res) => {
  console.log(req.params.id);
  await db.notice
    .destroy({
      where: {
        notice_id: req.params.id
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

noticeController.takeAttendence = async (req, res) => {
  await db.attendence
    .bulkCreate(req.body.attendenceData, {
      updateOnDuplicate: ["is_present"]
    })
    .then((data) => {
      if (data === null) {
        res.status(404).json({
          status: "Insertion Failed"
        });
      } else {
        res.status(200).json({
          data
        });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

noticeController.getAttendence = async (req, res) => {
  await db.attendence
    .findAll({
      where: { sectionSectionId: req.params.secId },
      include: [
        {
          model: db.student
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

module.exports = noticeController;
