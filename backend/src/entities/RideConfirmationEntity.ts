import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Drivers } from './DriversEntity';

@Entity('ride_confirmation')
export class RideConfirmation {
	@PrimaryGeneratedColumn()
	id:number | undefined;

@Column({ type: 'varchar', name: "costumerId"})
	custumer_id: number | undefined;

	@Column({ type: 'timestamp' })
	@CreateDateColumn()
	date?: string;

	@ManyToOne(() => Drivers, (driver) => driver.rides)
	driver?: Drivers;

	@Column({ type: 'varchar' })
	origin?: string;

	@Column({ type: 'varchar' })
	destination?: string;

	@Column({type: "numeric"})
	distance?: string;

	@Column({ type: 'varchar' })
	duration?: string;

	@Column({ type: 'numeric' })
	value?: number;
}
