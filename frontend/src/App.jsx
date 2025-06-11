import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/utils/Navbar/Navbar.jsx'
import Footer from './components/utils/Footer.jsx'
import './App.css'
import { UserProvider } from './components/utils/UserProvider.jsx'
import waveyFingerprint from './assets/backgrounds/wavey-fingerprint.svg'
import Alert from './components/utils/Alert.jsx'
import { AlertProvider } from './components/utils/AlertProvider.jsx'
import { LoadingProvider } from './components/utils/LoadingProvider.jsx'
import Loading from './components/utils/Loading.jsx'

export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState('dark')
  const bgImage = isDarkTheme ? "bg-dark-mode" : "bg-light-mode"
  console.log("url",import.meta.env.VITE_BACKEND_URL);

  return (
    <>
      <LoadingProvider>
        <AlertProvider>
          <UserProvider>
            <div className={`overflow-hidden bg-sky-100 dark:bg-slate-950 relative bg-cover bg-fixed bg-center w-full ${bgImage}`}>

              <img src={waveyFingerprint} alt="Overlay Image" className="overlay min-h-screen opacity-35 dark:opacity-10" />

              <div className="content z-20 min-h-screen relative flex justify-between flex-col">

                <Navbar isDark={isDarkTheme} setIsDark={setIsDarkTheme} />

                <div className='relative'>
                  <Loading />
                  <Alert />
                  <Outlet />
                </div>

                <Footer />
              </div>

            </div>
          </UserProvider>
        </AlertProvider>
      </LoadingProvider>
    </>
  )
}