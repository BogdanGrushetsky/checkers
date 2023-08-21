import { Types } from 'mongoose';


export interface jwtData {
	_id: Types.ObjectId;
	email: string;
	role: string;
}