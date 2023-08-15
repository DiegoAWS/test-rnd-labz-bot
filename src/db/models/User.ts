import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export type UserAttributes = {
  id?: number;
  telegram_id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  is_admin?: boolean;
}

export const User = sequelize.define<Model<UserAttributes>>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  telegram_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {

});
User.sync();
