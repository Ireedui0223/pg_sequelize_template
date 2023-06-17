import { DataTypes, Model, Sequelize } from 'sequelize';
import { BOOK_ENUM } from './Enum';
export default class Book extends Model {
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
          type: DataTypes.STRING(255),
          validate: {
            len: [2, 255],
            msg: 'Invalid title'
          },
          allowNull: false
        },
        author: {
          type: DataTypes.STRING,
          validate: {
            len: [2, 255],
            msg: 'Invalid author'
          },
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        about: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        keyIdeas: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        intendedUser: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: []
        },
        status: {
          type: DataTypes.ENUM(...BOOK_ENUM.STATUS),
          defaultValue: BOOK_ENUM.STATUS[0]
        },
        isSpecial: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        duration: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        viewCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      },
      {
        sequelize,
        modelName: 'Book'
      }
    );
  }
}
