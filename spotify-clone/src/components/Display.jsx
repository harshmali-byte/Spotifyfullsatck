import React, { useContext, useEffect, useRef } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import DisplayHome from './DisplayHome'; // Ensure this import matches your actual file structure
import DisplayAlbum from './DisplayAlbum';
// import { albumsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';


const Display = () => {
  const {albumsData}=useContext(PlayerContext)
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() :"" ;

  const bgColor =isAlbum ? albumsData.find((x)=>(x._id==albumId)).bgColour :"#121212" ;

  useEffect(()=>{
    if(isAlbum){
      displayRef.current.style.background=`linear-gradient(${bgColor},#121212)`

    }
    else{
      displayRef.current.style.background=`#121212`

    }
  })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%]'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id == albumId))}/>} />

      </Routes>

    </div>
  )
}

export default Display