import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/strategy/jwt/jwt.guard';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_CONECCTION ?? ""),
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  ],
})
export class AppModule { }

