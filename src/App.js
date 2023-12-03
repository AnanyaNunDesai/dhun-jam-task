import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
