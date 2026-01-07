import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  create(dto: CreateGroupDto) {
    const group = this.groupRepository.create(dto);
    return this.groupRepository.save(group);
  }

  findAll() {
    return this.groupRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return group;
  }

  async update(id: string, dto: UpdateGroupDto) {
    await this.findOne(id);
    await this.groupRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    return this.groupRepository.remove(group);
  }
}
