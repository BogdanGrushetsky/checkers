import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { io } from 'socket.io-client';
import { RouterProvider } from 'react-router-dom';
import { routersSite } from './routs';
export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', { extraHeaders: { authorization: `Bearer ${localStorage.getItem('token')}` } });



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routersSite} />
  </React.StrictMode>,
)
