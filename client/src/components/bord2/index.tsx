
import { Fragment, } from 'react';
import './bord2.css'
import Cells2 from '../cells2';
import { observer } from 'mobx-react-lite'
import { Stores } from '../../stores';

function Bord2() {


	Stores.reRender
	return (<div className="bord2">
		{Stores.bord?.cells?.map((row, rowIndex) => (
			<Fragment key={rowIndex}>
				{row.map((cell) => (
					<Cells2
						key={cell.key}
						cell={cell}
					/>
				))}
			</Fragment>
		))}
		{Array(8).fill(null).map((_, i) => (<div key={i} className='bord2__line'>{i}</div>))}
		<div className="bord2__line2">{Array(8).fill(null).map((_, i) => (<div key={i} className='bord2__line'>{i}</div>))}</div>
	</div>)
}

export const Bord = observer(Bord2)
