const Timeslot = function (sequelize, DataTypes) {
  return sequelize.define("timeslot", {
    timeslot_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    day: {
      type: DataTypes.ENUM(
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THRUSDAY",
        "SUNDAY-TUESDAY",
        "MONDAY-WEDNESDAY",
        "FRIDAY-WEDNESDAY",
        "TUESDAY-THRUSDAY",
        "SUNDAY-MONDAY"
      ),
      allowNull: false
    },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false }
  });
};

module.exports = Timeslot;
