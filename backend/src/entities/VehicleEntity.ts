import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Vehicles {
	@PrimaryGeneratedColumn()
	id:number | undefined;

	@Column('varchar')
	model: string | undefined

	@Column('text')
	description: string | undefined

}
