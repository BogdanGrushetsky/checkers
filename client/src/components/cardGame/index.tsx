


import { FireFilled } from '@ant-design/icons'
import styles from './cardGame.module.css'
import { gameVsInterface } from '../../interfaces'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import QueryClient from '../../service'
import { Stores } from '../../stores'
function CardGame({ data }: { data: gameVsInterface }) {
	const [stateModal, setStateModal] = React.useState(false)
	const { whitePlayer, blackPlayer, updateAt, winner, _id } = data
	const navigate = useNavigate()
	const ConnectToGame = () => {
		if (winner) return
		navigate(`/game/${_id}`)
	}
	const closeModal = () => {
		setStateModal(false)
	}
	const DelteGame = () => {
		QueryClient.deleteGame(_id).then(closeModal)
	}
	const shotButtonConnect = winner ? <strong>Winner: {winner.name}</strong> : <Button onClick={ConnectToGame}>Connect mathes</Button>
	const showButtonDellGame = Stores.user?.email === whitePlayer.email || Stores.user?.email === blackPlayer.email ? (<>
		<div onClick={() => setStateModal(true)} className={styles.ButtonDelete}>X</div>
		<Modal open={stateModal} onCancel={closeModal} onOk={DelteGame} title="Delete"  >
			Delte game?
		</Modal></>) : null
	return (
		<div className={styles.wrapperMain}>
			<div>
				<span>Update at: {new Date(updateAt).toLocaleString()} </span>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.playerWhite}>
					<h4>Player White</h4>
					<div className={styles.player}>
						<span> Name: {whitePlayer.name}</span>
						<span> Email: {whitePlayer.email}</span>
					</div>
				</div>
				<FireFilled className={styles.fire} />
				<div>
					<h4>Player Black</h4>
					<div className={styles.player}>
						<span>Name: {blackPlayer.name}</span>
						<span>Email: {blackPlayer.email}</span>
					</div>
				</div>
			</div>
			{showButtonDellGame}
			<div className={styles.wrapperButton}>{shotButtonConnect}</div>
		</div>
	)
}

export default CardGame