import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model<Users> {

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true, })
  id: string | undefined;

  @Column({ type: DataType.STRING, allowNull: false })
  username?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  login_token?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  vr?: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue : false })
  is_email_verified?: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue : true })
  is_active?: boolean;

}
