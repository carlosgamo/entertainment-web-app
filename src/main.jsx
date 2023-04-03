import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="123653857855-iigr6rqj9tpgvqr533sja0tg2pm2pppd.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
