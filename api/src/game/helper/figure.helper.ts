import { BoardModel } from './board.helper';
import { Cell2Model, FigureNames } from './cell.helper';

class WhiteFigure implements FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white' | 'black';
	constructor(map: mapInterface, id: string) {
		this.color = 'white'
		this.map = map
		this.id = id
		this.type = FigureNames.whiteCheaker
	}
}

class BlackFigure implements FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white' | 'black';
	constructor(map: mapInterface, id: string) {
		this.color = 'black'
		this.map = map
		this.id = id
		this.type = FigureNames.blackCheaker
	}
}

export { WhiteFigure, BlackFigure };




export interface res {
	move: null | Cell2Model,
	cheakerDellet: null | Cell2Model
}
export interface FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white' | 'black'
}



export interface mapInterface {
	x: number
	y: number
}