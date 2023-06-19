import { DataTypes, Model, Sequelize } from 'sequelize';
export default class Blog extends Model {
  public author!: string;
  public title!: string;
  public description!: string;

  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        authorId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
          validate: {
            len: [10, 200]
          }
        },
        description: {
          type: DataTypes.STRING(255),
          validate: {
            len: [0, 255]
          }
        }
      },
      {
        sequelize,
        modelName: 'Blog',
        timestamps: true
      }
    );
  }
}
