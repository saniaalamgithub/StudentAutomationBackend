const Complain = function (sequelize, DataTypes) {
  return sequelize.define("complain", {
    complain_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: { type: DataTypes.STRING, allowNull: false },
    notify_parent: { type: DataTypes.BOOLEAN, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    
    
  });
};

module.exports = Complain;
