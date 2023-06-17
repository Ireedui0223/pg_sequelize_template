import { DataTypes, Model, Sequelize } from 'sequelize';

export default class File extends Model {
  public static createModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        mimetype: DataTypes.STRING(50)
      },
      {
        sequelize,
        modelName: 'File'
      }
    );
  }
}
