import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('/register')
  @Version('1')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return this.authService.login(user);
  }

  @Post('/signin')
  @Version('1')
  @UseGuards(AuthGuard('local'))
  signin(@Request() req) {
    return this.authService.login(req.user);
  }
}
