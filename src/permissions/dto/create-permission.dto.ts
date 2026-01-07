import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ResourceType } from '../entities/permission.entity';

export class CreatePermissionDto {
  @IsEnum(ResourceType)
  resource: ResourceType;

  @IsBoolean()
  @IsOptional()
  canView?: boolean;

  @IsBoolean()
  @IsOptional()
  canCreate?: boolean;

  @IsBoolean()
  @IsOptional()
  canEdit?: boolean;

  @IsBoolean()
  @IsOptional()
  canDelete?: boolean;
}
