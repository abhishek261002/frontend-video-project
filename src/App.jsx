import react,{ useState ,useEffect} from 'react'
import Header from './components/headers/Header.jsx'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState("unfetched")

  useEffect(()=>{
    axios.post("/api/v1/users/login",
          {
              username: "three",
              email:"three",
              password:"three"
          },
          {    
             withCredentials : true
          }
    )
          .then((response)=>{
                    const data  = response.data.data;
                    console.log(response);
                     setData(data)
                     console.log(document.cookie);
                     })
          .catch((error)=> console.log(error))

  
  },[])
  
  return (
 <></>
  )
}

export default App
