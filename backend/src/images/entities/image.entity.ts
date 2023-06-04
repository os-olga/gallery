import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  filename: string;

  @Column({ type: 'text', default: null })
  description: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
