import { Cell2Model, FigureNames } from '../cells2/helper';
import { BlackFigure, FigureModel, WhiteFigure, mapInterface } from '../figurs/figure.model';



class BoardModel {
	cells: Cell2Model[][] = [];
	cellsInRow = 8;
	figurs: FigureModel[] = [];
	constructor(model: BoardModel) {
		this.setBoard(model.cells)
	}
	setBoard(cells: Cell2Model[][]) {
		this.cells = cells.map((row) => {
			row.map((cell,) => {
				if (cell.figure) {
					const { id, map, type } = cell.figure
					if (cell.figure.type === FigureNames.whiteCheaker + '') {
						const figure = new WhiteFigure(map, id, type)
						cell.figure = figure
						this.figurs.push(figure)
					}
					if (cell.figure.type === FigureNames.blackCheaker + '') {
						const figure = new BlackFigure(map, id, type)
						cell.figure = figure
						this.figurs.push(figure)
					}
					if (cell.figure.type === FigureNames.whiteQueen + '') {
						const figure = new WhiteFigure(map, id, type)
						figure.toQeen()
						cell.figure = figure
						this.figurs.push(figure)
					}
					if (cell.figure.type === FigureNames.blackQueen + '') {
						const figure = new BlackFigure(map, id, type)
						figure.toQeen()
						cell.figure = figure
						this.figurs.push(figure)
					}

					return cell
				}
			})
			return row
		})
	}

	getCell(x: number, y: number): Cell2Model {
		x == (undefined || 0) || x < 0 ? x = 0 : x
		y == (undefined || 0) || y < 0 ? y = 0 : y
		x >= 7 ? x = 7 : x
		y >= 7 ? y = 7 : y
		return this.cells[y][x];
	}
	setFigure(numbBlock: mapInterface, selectFigure: FigureModel) {
		this.getCell(numbBlock.x, numbBlock.y).figure = selectFigure
		this.getCell(selectFigure.map.x, selectFigure.map.y).figure = null
		selectFigure.map.x = numbBlock.x
		selectFigure.map.y = numbBlock.y
		selectFigure.map = numbBlock
		this.figurs = this.figurs.map((el) => el.id === selectFigure.id ? selectFigure : el)
		this.transformToQeen(selectFigure)
	}
	transformToQeen(selectFigure: FigureModel) {

		if (selectFigure.type as string === FigureNames.whiteCheaker as string && selectFigure.map.y === 0) {
			selectFigure.toQeen()
		}
		if (selectFigure.type as string === FigureNames.blackCheaker as string && selectFigure.map.y === 7) {
			selectFigure.toQeen()
		}
	}

	removeFigure(selectFigure: Cell2Model | null | undefined) {
		if (selectFigure) {
			this.figurs = this.figurs.filter(el => el.id !== selectFigure.figure?.id)
			this.getCell(selectFigure.x, selectFigure.y).figure = null
		}
	}

}
export { BoardModel };

export interface PlayerInterface {
	color: 'white' | 'black',
	cheackers: FigureNames.whiteCheaker | FigureNames.blackCheaker,
	queen: FigureNames.whiteQueen | FigureNames.blackQueen
}
export const whitePlayer: PlayerInterface = {
	color: 'white',
	cheackers: FigureNames.whiteCheaker,
	queen: FigureNames.whiteQueen
}
export const blackPlayer: PlayerInterface = {
	color: 'black',
	cheackers: FigureNames.blackCheaker,
	queen: FigureNames.blackQueen
}