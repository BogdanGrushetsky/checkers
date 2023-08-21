import $api from '../http'
import { registrationData } from '../interfaces/query.interface'
import { Stores } from '../stores'



class QueryClient {
	constructor() { }
	async registration(data: registrationData) {
		return await $api.post('auth/registration', data).then(res => {
			localStorage.setItem('token', res.data.access_token)
			Stores.setUserData(res.data)
		})
	}

	async login(data: registrationData) {
		return await $api.post('auth/login', data).then(res => {
			Stores.setUserData(res.data)
			localStorage.setItem('token', res.data.access_token)
		})
	}

	async getUserData() {
		return await $api.get('/user/personalData').then(res => {
			Stores.setUserData(res.data)
			console.log(res.data)
			return res.data
		}).catch(e => {
			console.log(e)
		})
	}

	async getAllOnlineUsers() {
		return await $api.get('/user/online').then(res => res.data)
	}

	async getAllRatingUsers() {
		return await $api.get('/user/rating').then(res => res.data).catch(e => {
			console.log(e)
		})
	}

	async getGameBoard(id: string) {
		return await $api.get(`/game/${id}`).then(res => res.data)
	}

	async getAllMyGame(id: string) {
		return await $api.get(`/game/all/${id}`).then(res => res.data)
	}

	async createGame(idAponent: string, side: 'white' | 'black') {
		return await $api.post(`/game/?idAponent=${idAponent}&side=${side}`).then(res => res.data)
	}

	async updateUser(data: unknown) {
		return await $api.patch('/user', data).then(res => res.data)

	}
	async deleteGame(id: string) {
		return await $api.delete(`/game/${id}`).then(res => res.data)
	}

	async getHistoryGameAdmin(id: string) {
		return await $api.get(`/game/all/admin/${id}`).then(res => res.data)
	}

}

export default new QueryClient