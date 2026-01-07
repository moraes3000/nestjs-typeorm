// src/users/user.entity.ts
import { Group } from 'src/groups/entities/group.entity';
import { UserPermission } from 'src/permissions/entities/user-permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Group, group => group.users)
  @JoinTable({
    name: 'user_groups',
  })
  groups: Group[];

  @OneToMany(() => UserPermission, up => up.user)
  permissions: UserPermission[];
}
