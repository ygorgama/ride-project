import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, } from 'typeorm'
import { Vehicles } from './VehicleEntity';
import { Reviews } from './ReviewsEntity';
import { RideConfirmation } from './RideConfirmationEntity';

@Entity()
export class Drivers {
	@PrimaryGeneratedColumn()
	id:number | undefined;

	@Column('varchar')
	name: string | undefined

	@Column({type: 'float', name: "tax"})
	value: number | undefined

	@Column('integer')
	minimal_km: number | undefined

	@Column('text')
	description?: string

	@OneToOne(() => Vehicles)
	@JoinColumn()
	vehicle?: Vehicles

	@OneToOne(() => Reviews)
	@JoinColumn()
	review?: Reviews

	@OneToMany(() => RideConfirmation, (ride) => ride.driver)
	rides?: RideConfirmation[]
}
