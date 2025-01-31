import Header from './components/headers/Header.jsx'
import { useDispatch } from 'react-redux'
import './App.css'
import authservice from './services/auth.service.js'
import Footer from './components/footers/Footer.jsx'
import { Outlet } from 'react-router-dom'
function App() {
  //const [data, setData] = useState("unfetched")
   
  
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
  )
}

export default App
