import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Permission } from './permission.entity';

@Entity('group_permissions')
export class GroupPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group, group => group.permissions, { onDelete: 'CASCADE' })
  group: Group;

  @ManyToOne(() => Permission, permission => permission.groupPermissions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  permission: Permission;
}
