import React,{useEffect ,useState} from 'react'
import playlistservice from '@/services/playlist.service'
import Container from '@/container/Container'
import { SearchX } from 'lucide-react'
import PlaylistCard from '@/components/playlist/PlaylistCard'
function Playlists() {
  
  const [playlists, setPlaylists] = useState([])
  const [error, setError] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
useEffect(()=>{
  const fetchPlaylists = async()=>{
    try {
      const playlists = await playlistservice.getAllUserPlaylists()
      if(playlists){
        console.log(playlists);
        setPlaylists(playlists)
      }
    } 
    catch (error) {
      console.log(error);
      setError(error?.message)
    }
  }
  fetchPlaylists()
},[refresh])


  return (
    playlists.length === 0 ?
        (<div className="w-full py-2 mt-4 text-center">
            <Container >
                    <div className="p-2 w-1/2 mx-auto flex flex-col gap-10 justify-center items-center">
                    <SearchX color='#9999' size={80}/>
                        <h1 className="text-4xl font-bold text-gray-500 tracking-widest">
                            Create New Playlist / No Playlists available.........
                        </h1>

                </div>
            </Container>
        </div>) :
        (<div className='w-full py-1 '>
            <Container>
                <div className='flex flex-wrap bg-white '>
                    {playlists && playlists.map((playlist) => (
                        <div key={playlists._id} className='p-8 w-1/4'>
                            <PlaylistCard {...playlist} setRefresh={setRefresh} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
        )
  )
}

export default Playlists