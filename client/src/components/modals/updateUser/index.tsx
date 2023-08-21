import { Input, Modal } from 'antd'
import React from 'react'
import QueryClient from '../../../service'
import styles from './updateUserModal.module.css'

function UpdateUserModal({ stateModal, handleClose }: { stateModal: boolean, handleClose: () => void }) {
	const [errorMassage, setErrorMassage] = React.useState('')

	const ref = React.useRef({ email: '', name: '' })
	const submit = () => {
		QueryClient.updateUser(ref.current).then(() => handleClose()).catch(e => setErrorMassage(e.response.data.message))
	}

	return (
		<Modal title="Update you profile" open={stateModal} onOk={submit} onCancel={handleClose} >
			<span className={styles.error}>{errorMassage}</span>
			<form className={styles.form}>
				<Input ref={el => ref.current.email = el?.input?.value + ''} name='email' type='email' placeholder="Email" max={100} />
				<Input ref={el => ref.current.name = el?.input?.value + ''} type='strring' name='name' placeholder='Name' max={20} />
			</form>
		</Modal>
	)
}

export default UpdateUserModal