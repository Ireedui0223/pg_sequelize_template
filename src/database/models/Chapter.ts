import { DataTypes, Model, Sequelize } from 'sequelize';
import { CHAPTER_ENUM } from './enum';

export default class Chapter extends Model {
  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
          validate: {
            len: [2, 200]
          }
        },
        text: {
          type: DataTypes.STRING(255),
          defaultValue: ''
        },
        viewCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        status: {
          type: DataTypes.ENUM(...CHAPTER_ENUM.STATUS),
          defaultValue: CHAPTER_ENUM.STATUS[0]
        }
      },
      {
        sequelize,
        modelName: 'Chapter'
      }
    );
  }
}
