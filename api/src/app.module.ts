import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule,
    UserModule,
    MongooseModule.forRoot('mongodb+srv://user:mouse27870@cluster0.r5aw1km.mongodb.net/?retryWrites=true&w=majority'),
    GameModule,
  ],
})
export class AppModule { }
