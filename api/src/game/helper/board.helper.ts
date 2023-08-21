import { Cell2Model, FigureNames, Labels } from './cell.helper';
import { BlackFigure, FigureModel, WhiteFigure, mapInterface } from './figure.helper';

class BoardModel {
	cells: Cell2Model[][] = [];
	cellsInRow = 8;
	constructor() {
		this.createCells();
	}
	createCells() {
		for (let i = 0; i < this.cellsInRow; i += 1) {
			const row: Cell2Model[] = [];

			for (let j = 0; j < this.cellsInRow; j += 1) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell2Model(j, i, Labels.Dark)); // black
				} else {
					row.push(new Cell2Model(j, i, Labels.Light)); // white
				}
			}
			this.cells.push(row);
		}
	}
	getCell(x: number, y: number): Cell2Model {
		x == (undefined || 0) || x < 0 ? x = 0 : x
		y == (undefined || 0) || y < 0 ? y = 0 : y
		x >= 7 ? x = 7 : x
		y >= 7 ? y = 7 : y
		return this.cells[y][x];
	}
	addFigures() {
		this.cells.forEach((row, rowIndex) => {
			row.forEach((cell) => {
				if (rowIndex <= 2 && cell.label === Labels.Dark) {
					const figur = new BlackFigure({ x: cell.x, y: cell.y }, (Math.random() * Math.pow(36, 6) | 0).toString(36));
					cell.figure = figur
				} else if (rowIndex >= this.cells.length - 3 && cell.label === Labels.Dark) {
					const figur = new WhiteFigure({ x: cell.x, y: cell.y }, (Math.random() * Math.pow(36, 6) | 0).toString(36));
					cell.figure = figur
				}
			});
		});
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