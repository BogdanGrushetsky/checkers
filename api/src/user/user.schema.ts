import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {

	@Prop({ type: String, default: 'Palyer' })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ type: String })
	password: string;

	@Prop({ default: 'user' })
	role: string;

	@Prop({ type: Boolean, default: false })
	online: boolean;

	@Prop({ type: Number, default: 0 })
	skore: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
