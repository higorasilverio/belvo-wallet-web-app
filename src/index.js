import { render } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Authentication, Transfer, Wallet } from './routes'

render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="transfer" element={<Transfer />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)

reportWebVitals()
