import { FigureModel } from '../figurs/figure.model';

export class Cell2Model {
	x: number;
	y: number;
	readonly label: Labels;
	figure: FigureModel | null; // our figure
	key: string;
	constructor(x: number, y: number, label: Labels) {
		this.x = x;
		this.y = y;
		this.label = label;
		this.key = `${String(x)}${String(y)}`;
		this.figure = null;
	}
}

export const enum Labels {
	Light = 'Light',
	Dark = 'Dark',
}

export const enum FigureNames {
	whiteCheaker = 'whiteCheaker',
	blackCheaker = 'blackCheaker',
	whiteQueen = 'whiteQueen',
	blackQueen = 'blackQueen',
}