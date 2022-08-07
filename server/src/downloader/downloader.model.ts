import {Column, DataType, Model, Table} from "sequelize-typescript";

@Table({tableName: 'downloader'})
export class Downloader extends Model<Downloader> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number
}