import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../role/entities/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
