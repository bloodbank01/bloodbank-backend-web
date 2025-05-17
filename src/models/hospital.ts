import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { Addresses } from './adresses';

@Table({ tableName: 'hospitals', timestamps: true })
export class Hospitals extends Model<Hospitals> {

    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string | undefined;

    @Column({ type: DataType.STRING, allowNull: true })
    name?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    type?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    description?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    contact_no?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    alternat_no?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    website?: string;

    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
    totalDoctors?: number;

    @Column({ type: DataType.STRING, allowNull: false })
    slug?: string;

    @BelongsTo(() => Addresses, { as: 'address', foreignKey: 'id', targetKey: 'hospital_id' })
    address?: Addresses
}
