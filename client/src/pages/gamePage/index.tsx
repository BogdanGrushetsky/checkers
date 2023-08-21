import { useNavigate, useParams } from 'react-router-dom'
import { Bord } from '../../components/bord2'
import React, { useLayoutEffect } from 'react'
import QueryClient from '../../service'
import { socket } from '../../main'
import { Stores } from '../../stores'
import styles from './gamePage.module.css'

function GamePage() {
	const navigate = useNavigate()
	const [stateWinner, setWinner] = React.useState(null)
	const idGame = useParams().id
	useLayoutEffect(() => {
		if (idGame) {
			socket.emit('joinRoom', idGame)
			socket.on('move', (data) => {
				Stores.updateGame(data.bord, data.ternMove)
			})
			socket.on('endGame', (data) => {
				setWinner(data)
			})
		}
	}, [])
	useLayoutEffect(() => {
		if (idGame) {
			QueryClient.getGameBoard(idGame).then(res => {
				Stores.setGame(res.bord, res.ternMove, res._id, res.whitePlayer, res.blackPlayer)
				if (res.winner) navigate('/')
			})
		}
	}, [])

	const showGmae = stateWinner ? winnerBlock(stateWinner) : <Bord />
	return (
		<div>{showGmae}</div>
	)
}

export default GamePage


const winnerBlock = ({ name, skore }: { name: string, skore: number }) => {

	return (
		<div className={styles.winnerBlock}>
			<h2>Game end</h2>
			<div className={styles.winner}>
				<span>Winner {name}</span>

				<span>Skor: {skore} </span>
			</div>
		</div>
	)
}