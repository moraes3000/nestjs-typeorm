import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('user_permissions')
export class UserPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.permissions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Permission, { eager: true, onDelete: 'CASCADE' })
  permission: Permission;
}
