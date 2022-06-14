const User = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("ADMIN", "STUDENT", "TEACHER", "GUARDIAN"),
      allowNull: false,
    },
    secret_code: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  });
};

module.exports = User;
