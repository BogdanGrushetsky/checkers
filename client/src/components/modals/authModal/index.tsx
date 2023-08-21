import { Input } from 'antd'
import Modal from 'antd/es/modal/Modal'


import styles from './authModal.module.css'
import React from 'react'
import QueryClient from '../../../service'

function AuthModal({ role, stateModal, handleClose }: { role: 'registration' | 'login', stateModal: boolean, handleClose: () => void }) {
	const [errorMassage, setErrorMassage] = React.useState('')
	const ref = React.useRef({ email: '', password: '' })
	const submit = () => {
		if (role === 'registration') {
			console.log(1)
			QueryClient.registration(ref.current).then(() => handleClose()).catch(e => setErrorMassage(e.response.data.message))
		}
		if (role === 'login') {
			QueryClient.login(ref.current).then(() => handleClose()).catch(e => setErrorMassage(e.response.data.message))
		}

	}
	const showErrorMassage = errorMassage && <span className={styles.error}>{errorMassage}</span>
	return (
		<Modal title="Auth" open={stateModal} onOk={submit} onCancel={handleClose}>
			<form className={styles.form}>
				{showErrorMassage}
				<Input ref={el => ref.current.email = el?.input?.value + ''} name='email' type='email' placeholder="Email" max={100} />
				<Input.Password ref={el => ref.current.password = el?.input?.value + ''} name='password' type='password' placeholder="Password" max={100} />
			</form>
		</Modal>
	)
}

export default AuthModal