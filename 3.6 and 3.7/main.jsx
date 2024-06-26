import React from 'react'
import ReactDOM from 'react-dom/client'

import Header from './Header.jsx'
import Content from './Content.jsx'

import Footer from './Footer.jsx'
import './all.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Header />
    <Content />
    <Footer /> 
  </React.StrictMode>,
)
