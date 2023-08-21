import { BoardModel } from '../bord2/helper';
import { Cell2Model, FigureNames } from '../cells2/helper';



class WhiteFigure implements FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white';
	constructor(map: mapInterface, id: string, type: FigureNames) {
		this.color = 'white'
		this.map = map
		this.id = id
		this.type = type
	}
	moveFigure(BoardModel: BoardModel) {
		if (this.type === FigureNames.whiteCheaker) {
			return this.moveCheaker(BoardModel)
		} else {
			return this.moveQeen(BoardModel)
		}
	}
	moveCheaker(BoardModel: BoardModel) {
		const leftMove = moving(BoardModel, { x: this.map.x + 1, y: this.map.y - 1 }, { x: this.map.x + 2, y: this.map.y - 2 }, this.type || FigureNames.whiteQueen)
		const rightMove = moving(BoardModel, { x: this.map.x - 1, y: this.map.y - 1 }, { x: this.map.x - 2, y: this.map.y - 2 }, this.type || FigureNames.whiteQueen)
		return [leftMove, rightMove].filter(el => el?.move !== undefined)
	}
	moveQeen(BoardModel: BoardModel) {
		const rightTopMove = mooveFigure(BoardModel, 'inc', 'dec', this.map, this.type || FigureNames.whiteQueen)
		const rightBottomMove = mooveFigure(BoardModel, 'dec', 'inc', this.map, this.type || FigureNames.whiteQueen)
		const leftDownMove = mooveFigure(BoardModel, 'inc', 'inc', this.map, this.type || FigureNames.whiteQueen)
		const leftTopDown = mooveFigure(BoardModel, 'dec', 'dec', this.map, this.type || FigureNames.whiteQueen)

		return [...leftTopDown, ...rightTopMove, ...rightBottomMove, ...leftDownMove].filter(el => el?.move !== undefined)
	}
	toQeen() {
		this.type = FigureNames.whiteQueen

	}
}

class BlackFigure implements FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white' | 'black';
	constructor(map: mapInterface, id: string, type: FigureNames) {
		this.color = 'black'
		this.map = map
		this.id = id
		this.type = type
	}
	moveFigure(BoardModel: BoardModel) {
		if (this.type === FigureNames.blackCheaker) {
			return this.moveCheaker(BoardModel)
		} else {
			return this.moveQeen(BoardModel)
		}
	}
	moveCheaker(BoardModel: BoardModel) {
		const leftMove = moving(BoardModel, { x: this.map.x - 1, y: this.map.y + 1 }, { x: this.map.x - 2, y: this.map.y + 2 }, this.type || FigureNames.blackQueen)
		const rightMove = moving(BoardModel, { x: this.map.x + 1, y: this.map.y + 1 }, { x: this.map.x + 2, y: this.map.y + 2 }, this.type || FigureNames.blackQueen)
		return [leftMove, rightMove].filter(el => el?.move !== undefined)
	}
	moveQeen(BoardModel: BoardModel) {
		const rightTopMove = mooveFigure(BoardModel, 'inc', 'dec', this.map, this.type || FigureNames.blackQueen)
		const rightBottomMove = mooveFigure(BoardModel, 'dec', 'inc', this.map, this.type || FigureNames.blackQueen)
		const leftDownMove = mooveFigure(BoardModel, 'inc', 'inc', this.map, this.type || FigureNames.blackQueen)
		const leftTopDown = mooveFigure(BoardModel, 'dec', 'dec', this.map, this.type || FigureNames.blackQueen)

		return [...leftTopDown, ...rightTopMove, ...rightBottomMove, ...leftDownMove].filter(el => el?.move !== undefined)
	}
	toQeen() {
		this.type = FigureNames.blackQueen
	}
}

export { WhiteFigure, BlackFigure };


function mooveFigure(BoardModel: BoardModel, xStep: string, yStep: string, map: mapInterface, type: FigureNames) {
	const res: res[] = []
	for (let index = 0; index < 7; index++) {
		const resultat = moving(BoardModel, { x: map.x + funcOperator(index, xStep), y: map.y + funcOperator(index, yStep) }, { x: map.x + funcOperator(index + 1, xStep), y: map.y + funcOperator(index + 1, yStep) }, type)
		if (!resultat) {
			break
		}
		res.push(resultat)
	}
	return [...res]
}
const funcOperator = (step: number, operator: string) => {
	if (operator === 'inc') {
		return +[step]
	} else {
		return -[step]
	}
}
function moving(BoardModel: BoardModel, step: mapInterface, twoStep: mapInterface, type: FigureNames) {
	const res: res = {
		move: null,
		cheakerDellet: null,
	}
	if (step.x < 0 || step.x > 7 || step.y < 0 || (step.y === 0 && step.x === 1) || step.y > 7) {
		return undefined
	}
	const cellOneStep = BoardModel.getCell(step.x, step.y)
	if (cellOneStep?.figure && cellOneStep.figure.type !== type) {
		const cellTwoStep = BoardModel.getCell(twoStep.x, twoStep.y)
		if (cellTwoStep?.figure || twoStep.x < 0 || twoStep.x > 7 || twoStep.y < 0 || (twoStep.y === 0 && twoStep.x === 1) || twoStep.y > 7) {
			return
		}
		res.move = cellTwoStep
		res.cheakerDellet = cellOneStep
		return res
	}
	res.move = cellOneStep
	return res
}



export interface res {
	move: null | Cell2Model,
	cheakerDellet: null | Cell2Model
}
export interface FigureModel {
	type: FigureNames
	id: string
	map: mapInterface
	color: 'white' | 'black'
	moveFigure: (BoardModel: BoardModel) => (res | undefined)[]
	toQeen: () => void
}



export interface mapInterface {
	x: number
	y: number
}