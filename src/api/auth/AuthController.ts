import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "./AuthService";
import { RegisterDTO } from "./AuthDTOs";
import { LocalGuard } from "../../security/LocalGuard";

@Controller({
  path: '/auth',
})
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(
    @Body() body: RegisterDTO,
  ) {
    return this.authService.register(body);
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  async login(
    @Request() req,
  ) {
    return this.authService.login(req.user);
  }
}
