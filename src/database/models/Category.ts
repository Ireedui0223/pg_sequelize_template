import { DataTypes, Model, Sequelize } from 'sequelize';

export default class Category extends Model {
  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
          validate: {
            len: [2, 200],
            msg: 'Invalid title'
          }
        },
        icon: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            len: [2, 255],
            msg: 'invalid icon'
          }
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true
        }
      },
      {
        sequelize,
        modelName: 'Category'
      }
    );
  }
}
