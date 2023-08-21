
import { Layout } from 'antd';

const { Header } = Layout
import QueryClient from '../../service'
import styles from './header.module.css'
import { UserAddOutlined, UserOutlined, VerticalRightOutlined } from '@ant-design/icons';
import AuthModal from '../../components/modals/authModal';
import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Stores } from '../../stores';
import { NavLink, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/checkers.svg';
import UpdateUserModal from '../../components/modals/updateUser';
function HeaderLayout() {
	useLayoutEffect(() => {
		if (localStorage.getItem('token')) {
			QueryClient.getUserData()
		}
	}, [])
	const chozeShowContent = Stores.user ? <ProfileHeader /> : <ShowNotLoginNav />
	return (
		<Header className={styles.header}>
			<NavLink to={'/'} className={styles.wrapperLogo}>
				<Logo className={styles.logo} />
				<span>Cheakers online</span>
			</NavLink>
			<section className={styles.wrapper}>
				{chozeShowContent}
			</section>
		</Header>
	)
}


const ProfileHeader = observer(() => {
	const nav = useNavigate()
	const [stateModal, setStateModal] = React.useState(false)

	const handleCloseModal = () => {
		setStateModal(false)
	}
	const handleOpenModal = () => {
		setStateModal(true)
	}

	const funcLogout = () => {
		nav('/')
		localStorage.removeItem('token')
		Stores.setUserData(undefined)
	}
	return (<>
		<div onClick={handleOpenModal} className={styles.register}>
			<UserOutlined />
			<span>Name: {Stores.user?.name || Stores.user?.email} </span>
			<UpdateUserModal stateModal={stateModal} handleClose={handleCloseModal} />
		</div>
		<div className={styles.register} onClick={funcLogout}>
			<VerticalRightOutlined />
			<span>Sign out</span>
		</div>
	</>)
})

const ShowNotLoginNav = () => {
	const [stateModal, setStateModal] = React.useState(false)
	const ref = React.useRef('registration')
	const handleRegestrationOpenModal = () => {
		ref.current = 'registration'
		setStateModal(true)
	}
	const handleLoginOpenModal = () => {
		ref.current = 'login'
		setStateModal(true)
	}
	const handleCloseModal = () => {
		setStateModal(false)
	}
	return (<>
		<div className={styles.register} onClick={handleRegestrationOpenModal}>
			<UserAddOutlined />
			<span>Sign up</span>
		</div>
		<div className={styles.register} onClick={handleLoginOpenModal}>
			<UserOutlined />
			<span>Sign in</span>
		</div>
		<AuthModal role={ref.current as 'registration' | 'login'} stateModal={stateModal} handleClose={handleCloseModal} />
	</>)
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(HeaderLayout)