export interface userInterface {
	_id: string;
	email: string;
	role: string;
	name: string;
	skore: number;
	online: boolean
}

export interface gameVsInterface {
	whitePlayer: userInterface,
	blackPlayer: userInterface,
	_id: string,
	updateAt: Date,
	winner: userInterface
}
