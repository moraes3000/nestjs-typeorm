import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, owner: User) {
    const post = this.postRepository.create({
      ...dto,
      owner,
    });

    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, dto: CreatePostDto) {
    await this.findOne(id);
    await this.postRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
