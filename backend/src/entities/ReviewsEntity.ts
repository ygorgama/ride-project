import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Reviews {
	@PrimaryGeneratedColumn()
	id:number | undefined;

	@Column({ type: 'integer' })
	raiting: number | undefined

	@Column({ type: 'text' })
	comment: string | undefined
	

}
