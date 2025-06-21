import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appWrite/auth';
import {login, logout} from './store/authSlice'
import './App.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setloading(false))
  }, [])


  return !loading ? (
    <div className="div h-screen w-screen">
      <div className="divv w-full block">
        <Header/>
        <main>
          {/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : <div className="div">Ruk ja bhai.. data abhi boeing flight se aa raha hai.. in the air soon will be on ground...</div>
}

export default App
