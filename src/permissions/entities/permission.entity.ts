import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupPermission } from './group-permission.entity';
import { UserPermission } from './user-permission.entity';

export enum ResourceType {
  POST = 'post',
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ResourceType })
  resource: ResourceType;

  @Column({ nullable: true })
  resourceId?: string; // ID do item (post.id)

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canCreate: boolean;

  @Column({ default: false })
  canEdit: boolean;

  @Column({ default: false })
  canDelete: boolean;

  @OneToMany(() => UserPermission, up => up.permission)
  userPermissions: UserPermission[];

  @OneToMany(() => GroupPermission, gp => gp.permission)
  groupPermissions: GroupPermission[];
}
