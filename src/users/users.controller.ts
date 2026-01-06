import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.usersService.create(dto.email, dto.password);
  }
}
