const ClassEvent = function (sequelize, DataTypes) {
    return sequelize.define("class_event", {
      class_event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      date: { type: DataTypes.DATE, allowNull: false },
      role: {
        type: DataTypes.ENUM(
          "QUIZ",
          "MID",
          "FINAL",
          "ASSIGNMENT",
          "PRESENTATION"
        ),
        allowNull: false
      }
    });
  };
  
  module.exports = ClassEvent;
  