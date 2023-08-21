import React, { useLayoutEffect } from 'react'
import UiList from '../components/uiList'
import styles from './mainPage.module.css'

import QueryClient from '../service'
import CardPlayer from '../components/cardPalyer'
import { gameVsInterface, userInterface } from '../interfaces'
import { Stores } from '../stores'
import CardGame from '../components/cardGame'
import { observer } from 'mobx-react-lite'

function MainPage() {
	const [userOnline, setUserOnline] = React.useState([])
	const [userRating, setUserRating] = React.useState([])
	const [myGame, setMyGame] = React.useState([])
	useLayoutEffect(() => {
		QueryClient.getAllOnlineUsers().then(res => setUserOnline(res))
		QueryClient.getAllRatingUsers().then(res => setUserRating(res))
		if (Stores.user?._id) {
			QueryClient.getAllMyGame(Stores.user?._id).then(res => setMyGame(res))
		}
	}, [Stores.user?._id])
	const listOnlinePlayer = userOnline?.map((el: userInterface) => <CardPlayer key={el._id} {...el} />)
	const listnRate = userRating?.map((el: userInterface) => <CardPlayer key={el._id} {...el} />)
	const myGameArray = myGame?.map((el: gameVsInterface) => <CardGame data={el} key={el._id} />)
	const showMyGame = Stores.user?.email && (<UiList title='You history game'>
		{myGameArray}
	</UiList>)
	return (
		<section className={styles.wrapper}>
			<UiList title='Player Online' >
				{listOnlinePlayer}
			</UiList>
			<UiList title='Top Players' >
				{listnRate}
			</UiList>
			{showMyGame}
		</section>
	)
}


export default observer(MainPage)