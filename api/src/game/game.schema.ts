import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BoardModel } from './helper/board.helper';

export type GameDocument = HydratedDocument<Game>;
@Schema()
export class Game {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	whitePlayer: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	blackPlayer: string;


	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	winner: string;

	@Prop({ type: String, enum: ['white', 'black'], default: 'white' })
	ternMove: string;


	@Prop()
	bord: BoardModel;

	@Prop({ type: Date, default: Date.now })
	updateAt: Date;

	_id: mongoose.Schema.Types.ObjectId
}


export const GameSchema = SchemaFactory.createForClass(Game);
