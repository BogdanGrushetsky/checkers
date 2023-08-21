import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LayoutPage from './Layout';
// import MainPage from './pages/mainPage';
// import ProfileUser from './pages/profileUser';
// import GamePage from './pages/gamePage';
import { lazy } from 'react';
const GamePage = lazy(() => import('./pages/gamePage'));
const MainPage = lazy(() => import('./pages/mainPage'));
const ProfileUser = lazy(() => import('./pages/profileUser'));

export const routersSite = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<LayoutPage />}>
			<Route index element={<MainPage />} />
			<Route path='/user/:id' element={<ProfileUser />} />
			<Route path='/game/:id' element={<GamePage />} />
		</Route>
	)
);