// models/Token.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { User } from './User';

export class Token extends Model {
  public id!: number;
  public userId!: number;
  public accessToken!: string;
  public refreshToken!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: false,
        field: "user_id"          
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "access_token"
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "refresh_token"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "is_active"
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
  
  },
  {
    sequelize,
    modelName: 'token',
    tableName: 'token',
    timestamps: true,
  }
);

