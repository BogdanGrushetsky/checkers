

import './cells2.css'
import { Cell2Model, Labels } from './helper'
import { ChekerComponent } from '../figurs'
import { Stores } from '../../stores'
function Cells2({ cell }: { cell: Cell2Model }) {
	const styles = cell.label === Labels.Light ? 'light' : 'dark'
	const onClickFunction = () => {
		if (!cell.figure) {
			Stores.setSelectBlock({ x: cell.x, y: cell.y })
		}
	}
	const showImg = cell?.figure && <ChekerComponent data={cell.figure} />

	return (<div onClick={onClickFunction} className={`cell ${styles}`}>
		{showImg}
	</div>)
}

export default Cells2

