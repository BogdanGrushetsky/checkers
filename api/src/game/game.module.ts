import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { Game, GameSchema } from './game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWTauthGuard } from 'src/auth/guard/jwt.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Game", schema: GameSchema }]), UserModule, JwtModule],
  controllers: [GameController],
  providers: [GameGateway, GameService],
})
export class GameModule { }
