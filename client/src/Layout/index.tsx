import { Layout } from 'antd';


import HeaderLayout from './header'
// import SideBarLayout from './sidebar'
import FooterLayout from './footer'


import styles from './layout.module.css'
import { Content, } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';


function LayoutPage() {
	return (
		<Layout className={styles.layout}>
			<HeaderLayout />
			<Content className={styles.content} >
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</Content>
			<FooterLayout />
		</Layout>
	)
}

export default LayoutPage