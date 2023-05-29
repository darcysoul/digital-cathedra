import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
@Module({
	imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432, 
      username: 'postgres', 
      password: '158821Xy', 
      host: 'localhost',
      synchronize: false, //отключаем автосинхронизацию
      logging: 'all', 
      entities: ['dist/**/*.entity{.ts,.js}'] //путь к сущностямn
    }),
		UsersModule,
		AuthModule,
	],
	// controllers: [AppController],
	providers: [/*AppService,*/ 
		JwtAuthGuard, 
		LocalAuthGuard,
		/*{
    		provide: APP_GUARD,
    		useClass: RolesGuard,
		},*/
	],
})
export class AppModule {}

