module.exports = function (sequelize, DataTypes) {
  let Ad = sequelize.define(
    "Ad",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: "Any post must have at least 3 and max 50 characters"
          }
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 200],
            msg: "Location must have at least 6 and max 200 characters"
          }
        }
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 1000],
            msg:
              "Post description must have at least 10 and max 1000 characters"
          }
        }
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true
      },

      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      Category: {
        type: DataTypes.STRING,
        defaultValue: "Shoes"
      },

      ContactEmail: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          len: {
            args: [1, 200],
            msg: "E-mail must have max 200 characters"
          }
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  Ad.associate = function (models) {
    Ad.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ad;
};
