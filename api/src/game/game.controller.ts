import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { JWTauthGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/roles/index.decorator';
import { filter } from 'rxjs';
import { RolesGuard } from 'src/guards/roles.guard';



@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService, private readonly gameGateway: GameGateway) { }

  @UseGuards(JWTauthGuard)
  @Post('')
  async create(@Query('idAponent') idAponent: string, @Req() req, @Query('side') side: 'white' | 'black') {

    const gameId = await this.gameService.create(req.user.id, idAponent, side);
    return gameId
  }

  @UseGuards(JWTauthGuard)
  @Get('/:id')
  async connected(@Param('id') id: string, @Req() req) {
    const game = await this.gameService.findOneById(id);
    if (!game || (game.whitePlayer === req.user.id || game.blackPlayer === req.user._id)) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }

    return game
  }

  @UseGuards(JWTauthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req) {
    const game = await this.gameService.delete(id, req.user.id);
    return game
  }

  @UseGuards(JWTauthGuard)
  @Get('/all/:id')
  async find(@Req() req) {
    const historyGame = await this.gameService.find(req.user.id)
    return historyGame
  }

  @Roles('admin')
  @UseGuards(JWTauthGuard, RolesGuard)
  @Get('all/admin/:id')
  async findAdmin(@Param('id') id: string) {
    const historyGame = await this.gameService.find(id)
    const filtDoneGame = historyGame?.filter(el => el.winner)
    return filtDoneGame

  }


}
