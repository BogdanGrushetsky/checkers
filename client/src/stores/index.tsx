import { makeAutoObservable } from 'mobx';
import { BoardModel, PlayerInterface, blackPlayer, whitePlayer } from '../components/bord2/helper';
import { FigureModel, mapInterface, res } from '../components/figurs/figure.model';
import { userInterface } from '../interfaces';
import { socket } from '../main';

class StoreClass {
	user: userInterface | undefined
	reRender: boolean = false
	bord: BoardModel | null = null
	activeFigure: FigureModel | null = null
	selectBlock: mapInterface | null = null
	turn: PlayerInterface | null = null
	idGame: string | null = null
	figureToMove: FigureModel[] = []
	side: PlayerInterface | null = null
	constructor() {
		makeAutoObservable(this);
	}

	setGame(board: BoardModel, turn: 'white' | 'black', idGame: string, whitePlayerId: string, blackPlayerId: string) {
		this.bord = null,
			this.activeFigure == null
		this.selectBlock = null
		this.turn = null
		this.idGame = null
		this.figureToMove = []
		this.side = null

		if (turn === 'white') {
			this.turn = whitePlayer
		} else {
			this.turn = blackPlayer
		}
		console.log(whitePlayerId, this.user?._id, blackPlayerId)
		console.log(whitePlayerId === this.user?._id, blackPlayerId === this.user?._id)
		if (whitePlayerId === this.user?._id) this.side = whitePlayer
		if (blackPlayerId === this.user?._id) this.side = blackPlayer
		console.log(this.side)
		this.idGame = idGame
		this.bord = new BoardModel(board)
		this.cheacCheaker()
	}

	updateGame(board: BoardModel, turn: 'white' | 'black',) {
		if (turn === 'white') {
			this.turn = whitePlayer
		} else {
			this.turn = blackPlayer
		}
		this.bord = new BoardModel(board)
		this.cheacCheaker()
	}

	setActiveBlock(data: FigureModel) {
		console.log(this.turn?.color, this.side?.color, this.figureToMove)
		if (!this.turn) return
		if (this.turn?.color !== this.side?.color) return
		if (this.figureToMove.length && !this.figureToMove?.some(el => data.id === el?.id)) {

			this.activeFigure = null
			return
		}
		if (this.turn.cheackers as string === data.type || this.turn.queen as string === data.type) {
			this.activeFigure = data
		} else {
			this.activeFigure = null
		}

	}
	setSelectBlock(numbBlock: mapInterface) {
		if (this.activeFigure) {
			this.selectBlock = numbBlock
			this.moveFigureCheaker(numbBlock)
		}
	}
	cheacCheaker() {
		if (!this.turn) return
		if (this.bord && this.turn.color == this.side?.color) {
			console.log(this.bord)
			this.bord.figurs.forEach(el => {
				if (el.color === this.turn?.color)
					if (el.moveFigure(this.bord as BoardModel)?.some(el => el?.cheakerDellet)) {
						this.figureToMove?.push(el)
					}
			})
		}
	}
	changeTern() {
		if (!this.turn) return
		this.activeFigure = null
		this.reRender = !this.reRender
		this.figureToMove = []
		this.setTurnUser()
		if (this.cheackEndGame()) {

			const skore = this.getSkore()
			// console.log(1)
			console.log(skore)
			socket.emit('setWinner', { bord: this.bord, winner: this.user?._id, idGame: this.idGame, skore })
			return
		}
		socket.emit('updateGame', { idGame: this.idGame, ternMove: this.turn.color, bord: this.bord })
	}
	cheackEndGame() {
		let whiteFigurs = 0
		let blackFigurs = 0
		this.bord?.figurs.forEach(el => {
			if (el.color === whitePlayer.color) whiteFigurs++
			if (el.color === blackPlayer.color) blackFigurs++
		})
		return whiteFigurs === 0 || blackFigurs === 0
	}

	getSkore() {
		let whiteFigurs = 0
		let blackFigurs = 0
		this.bord?.figurs.forEach(el => {
			if (el.color === whitePlayer.color) whiteFigurs++
			if (el.color === blackPlayer.color) blackFigurs++
		})
		if (whiteFigurs === 0) return (blackFigurs + 0) * 10
		if (blackFigurs === 0) return (whiteFigurs + 0) * 10
	}

	setTurnUser() {
		if (!this.turn) return
		if (this.turn.color === whitePlayer.color) {
			this.turn = blackPlayer
		} else {
			this.turn = whitePlayer
		}
	}
	moveDelletFigure(numbBlock: mapInterface, move: res) {
		if (this.bord) {
			this.bord.removeFigure(move?.cheakerDellet)
			this.bord.setFigure(numbBlock, this.activeFigure as FigureModel)
			const cheackKillCheack = this.activeFigure?.moveFigure(this.bord).some(el => el?.cheakerDellet)
			if (cheackKillCheack && this.activeFigure) {
				this.reRender = !this.reRender
				this.figureToMove = [this.activeFigure]
				return false
			}
			return true
		}
	}
	moveFigureCheaker(numbBlock: mapInterface) {
		if (!this.bord) return
		if (!this.activeFigure) return
		let move = this.activeFigure.moveFigure(this.bord)
		console.log(move)
		if (move.some(el => el?.cheakerDellet)) {
			move = move.filter(el => el?.cheakerDellet)
		}
		move = move?.filter((cell) => (cell?.move && cell?.move.x) === numbBlock.x && (cell?.move && cell?.move.y) === numbBlock.y)
		if (move.length) {
			if (move.some(el => el?.cheakerDellet)) {
				const ednTurn = this.moveDelletFigure(numbBlock, move[0] as res)
				if (ednTurn) {
					this.changeTern()
				}
			} else {
				this.bord.setFigure(numbBlock, this.activeFigure as FigureModel)
				this.changeTern()
			}
		}


	}
	setReRender() {
		this.reRender = !this.reRender
	}
	setUserData(data: userInterface | undefined) {
		this.user = data
	}

}



export const Stores = new StoreClass();
