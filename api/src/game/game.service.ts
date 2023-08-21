import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BoardModel } from './helper/board.helper';
import { Game } from './game.schema';

@Injectable()
export class GameService {

  constructor(@InjectModel('Game') private gameModel: Model<Game>) { }


  async create(idUser: string, idAponent: string, side: 'white' | 'black'): Promise<string> {
    const bord = new BoardModel()
    bord.addFigures()
    const params = {
      whitePlayer: idUser,
      blackPlayer: idAponent,
      bord,
    }
    if (side === 'black') {
      params.whitePlayer = idAponent
      params.blackPlayer = idUser
    }
    const game = await this.gameModel.create(params);
    game.save()
    const idGame = game._id + ''
    return idGame;
  }
  async delete(id: string, idUser: string): Promise<boolean> {
    const game = await this.gameModel.findById(id).exec()
    console.log(idUser, game.blackPlayer, game.whitePlayer)
    if (game.whitePlayer + '' === idUser || game.blackPlayer + '' === idUser) {
      await this.gameModel.findByIdAndDelete(id);
    }
    return true
  }

  async findOneById(id: string): Promise<Game> {
    const game = await this.gameModel.findById(id);
    return game;
  }

  async find(id: string): Promise<Game[]> {
    const allGame = await this.gameModel.find({
      $or: [
        { whitePlayer: { $eq: id } },
        { blackPlayer: { $eq: id } },
      ]
    }).populate('whitePlayer').populate('blackPlayer').populate('winner').exec();
    return allGame
  }

  async updateBoard(id: string, ternMove: 'white' | 'black', bord: BoardModel) {
    const game = await this.gameModel.findById(id)
    game.ternMove = ternMove
    game.bord = bord
    game.updateAt = new Date()
    game.save()
    return game
  }
  async endGame(id: string, winner: string, bord: BoardModel) {
    const game = await this.gameModel.findById(id)
    game.winner = winner
    game.bord = bord
    game.updateAt = new Date()
    game.save()
    return game
  }

}
