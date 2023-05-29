import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TheUser } from './users.entity';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('users')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}
 
 
 @Roles(Role.Admin, Role.User)
 @Get()
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiBearerAuth()
 @ApiOkResponse({ type: TheUser })
 async findAll() {
 	const users = await this.usersService.findall();
 	return users;
 }

 @Roles(Role.Admin)
 @Get(':userId')
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiBearerAuth()
 @ApiOkResponse({ type: TheUser })
 async findOneId(@Param('userId', ParseIntPipe) userId: number) {
   return this.usersService.findOneId(userId);
 }
}