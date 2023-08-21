import whitePiece from '../../icons/blue-pawn.png'
import blackPiece from '../../icons/red-pawn.png'
import blackQueen from '../../icons/red-king.png'
import whiteQueen from '../../icons/blue-king.png'
import './figure.css'
import { observer } from 'mobx-react-lite'
import { Stores } from '../../stores'
import { FigureNames } from '../cells2/helper'
import { FigureModel } from './figure.model'

export function Cheker({ data }: { data: FigureModel }) {

	const funcClick = () => {
		Stores.setActiveBlock(data)
	}
	const activeStyles = Stores?.activeFigure?.id === data.id ? 'active' : ''
	return <img onClick={funcClick} className={`icon ${activeStyles}`} src={switFigure(data.type)} />
}
const switFigure = (figure: FigureNames | null) => {
	switch (figure) {
		case FigureNames.blackCheaker:
			return blackPiece
		case FigureNames.whiteCheaker:
			return whitePiece
		case FigureNames.blackQueen:
			return blackQueen
		case FigureNames.whiteQueen:
			return whiteQueen

		default:
			return
			break;
	}
}
export const ChekerComponent = observer(Cheker);
