import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import WelcomePage from './pages/WelcomePage.tsx'
import './App.css'
import ChatLayout from './layouts/ChatLayout.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ChatLayout/>}>
          <Route path="/welcome" element={<WelcomePage />} />
        </Route>

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
