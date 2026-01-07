import { GroupPermission } from 'src/permissions/entities/group-permission.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, user => user.groups)
  users: User[];

  @OneToMany(() => GroupPermission, gp => gp.group)
  permissions: GroupPermission[];
}
