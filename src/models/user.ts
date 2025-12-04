import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { IRegisterForm } from '../interfaces/RegisterForm';

interface UserAttributes extends IRegisterForm {
  id: number;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public dob!: Date;
  public gender!: 'Male' | 'Female' | 'Other';
  public password!: string;
  public country!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    tableName: 'users',
  }
);