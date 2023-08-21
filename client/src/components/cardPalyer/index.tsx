

import { Button, Modal, Popconfirm, Radio, RadioChangeEvent } from 'antd'
import { gameVsInterface, userInterface } from '../../interfaces'
import styles from './cardPalyer.module.css'
import React, { useState } from 'react';
import QueryClient from '../../service'
import { useNavigate } from 'react-router-dom';
import { Stores } from '../../stores';
import CardGame from '../cardGame';

function CardPlayer({ name, online, email, skore, _id }: userInterface) {
	const [value, setValue] = useState('white');
	const navigate = useNavigate()
	const showOnlineUser = online ? <div className={styles.greenSercle} /> : <div className={styles.redSercle} />
	const Chalengefunc = () => {
		if (Stores.user?.email === email) {
			return
		} else {
			QueryClient.createGame(_id, value as 'white' | 'black').then(res => {
				navigate(`/game/${res}`)
			})
		}
	}
	const onChange = (e: RadioChangeEvent) => {
		setValue(e.target.value);
	};
	const showButton = (online && Stores.user?.email && Stores.user?.email !== email) && (<Popconfirm
		title="Choze the side"
		description={() => <Radio.Group onChange={onChange} value={value}>
			<Radio value={'white'}>White</Radio>
			<Radio value={'black'}>Black</Radio>
		</Radio.Group>}
		onConfirm={Chalengefunc}
	>
		<Button>Make a challenge</Button> </Popconfirm>)


	const showButtonAdminHistoryGamer = (Stores.user?.role === 'admin' && Stores.user?.email !== email) && <ShowButtonHostory email={email} id={_id} />
	return (
		<li className={styles.wrapper}>
			<div className={styles.infoWrapper} >
				<div className={styles.info}>
					<span>Name: {name}</span>
					<span>Email: {email}</span>
				</div>
				<div className={styles.info}>
					<span>Rate: {skore}</span>
					<span>{showOnlineUser}</span>
				</div>
			</div>
			{showButton}
			{showButtonAdminHistoryGamer}
		</li>
	)
}

const ShowButtonHostory = ({ email, id }: { email: string, id: string }): JSX.Element | null => {
	const [stateModal, setStateModal] = React.useState(false)
	const [stateHistory, setStateHistory] = React.useState([])

	if (Stores.user?.role !== 'admin' && Stores.user?.email === email) {
		return null
	}
	const funcClick = () => {
		setStateModal(true)
		QueryClient.getHistoryGameAdmin(id).then(res => {
			setStateHistory(res)
		})
	}
	const showArrayPlayer = stateHistory.map((el: gameVsInterface) => <CardGame key={el._id} data={el} />)
	return (
		<div>
			<Button onClick={funcClick}>Show Hostory</Button>
			<Modal title="Hostory" open={stateModal} onOk={() => setStateModal(false)} onCancel={() => setStateModal(false)}>
				{showArrayPlayer}
			</Modal>
		</div>
	)
}

export default CardPlayer