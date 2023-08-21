import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Server, Socket } from 'socket.io';
import { JWTauthGuard } from 'src/auth/guard/jwt.guard';
import { HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtData } from 'src/auth/auth.interface';
import { BoardModel } from './helper/board.helper';
import { Game } from './game.schema';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway {
  constructor(private UserService: UserService, private readonly gameService: GameService, private jwtService: JwtService) { }

  @WebSocketServer()
  server: Server;
  async handleConnection(socket: Socket) {
    const payload = await this.getDataToken(socket)
    if (!payload) return

    await this.UserService.updateStatusOnline(payload.id || payload._id, true)
    console.log(`Client connected: ${socket?.id}`);
  }

  async handleDisconnect(socket: Socket) {
    if (!socket.handshake.headers.authorization) return

    const payload = await this.getDataToken(socket)

    await this.UserService.updateStatusOnline(payload.id || payload._id, false)
    console.log(`Client disconnected: ${socket?.id}`);
  }


  @SubscribeMessage('updateGame')
  async update(@MessageBody() { bord, ternMove, idGame }: { bord: BoardModel, ternMove: "white" | "black", idGame: string },) {

    const game = await this.gameService.updateBoard(idGame, ternMove, bord);
    this.server.to(idGame).emit('move', game)
  }

  @SubscribeMessage('move')
  async move(@MessageBody() data: Game,) {
    return data
  }

  @SubscribeMessage('setWinner')
  async setWinner(@MessageBody() { bord, winner, idGame, skore }: { bord: BoardModel, winner: string, idGame: string, skore: number },) {
    const game = await this.gameService.endGame(idGame, winner, bord);
    await this.UserService.updateSkore(winner, skore);
    const winnerUser = await this.UserService.getById(winner);
    this.server.to(idGame).emit('endGame', winnerUser)
    return { bord }

  }
  @SubscribeMessage('endGame')
  async endGame(@MessageBody() { winner }: { winner: string },) {

    return winner
  }


  @SubscribeMessage('joinRoom')
  async joinRoom(socket: Socket, room: string) {
    socket.join(room);
  }
  private async getDataToken(socket: Socket) {
    const [type, token] = socket.handshake.headers.authorization.split(' ');

    if (token.length < 6) return false
    const payload = await this.jwtService.verifyAsync(token, {
      secret: 'jwt-secret',
    });
    return payload
  }

}



  // const rooms = this.server.sockets.adapter.rooms.get('room2');
    // console.log(rooms)