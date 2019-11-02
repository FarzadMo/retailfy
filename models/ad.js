module.exports = function(sequelize, DataTypes) {
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

      category: {
        type: DataTypes.STRING,
        defaultValue: "Shoes"
      },

      contactEmail: {
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
      freezeTableName: true,
      hooks: {
        //trigger to update the file name after store on database
        afterCreate: function(experience) {
          if (experience.image) {
            let fileName =
              "experience_" + experience.id + "." + experience.image;
            experience.image = fileName;

            Experience.update(
              {
                image: fileName
              },
              {
                where: {
                  id: experience.id
                }
              }
            ).then(() => {
              console.log("Image renamed!");
            });
          }
        }
      }
    }
  );

  Ad.associate = function(models) {
    Ad.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ad;
};
