import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';

export class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string; 
  public createdAt!: Date;
  public updatedAt!: Date;
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name', // This maps to the `first_name` column in the database
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name', // This maps to the `last_name` column in the database
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }},
  {
    sequelize,
    modelName: 'user',
    tableName: 'user', // This is the actual table name in the database
    timestamps: true, // This enables the `createdAt` and `updatedAt` fields
  }
);