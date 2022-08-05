import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {TailSpin	} from 'react-loader-spinner'
import Pagination from './Pagination'
import favouriteIcon from './heart.png'
import removeIcon from './remove.png'
function Movies() {
  
  const [movies,setMovies] = useState([]);
  const [page,setPage] = useState(1);
  const [hover,setHover] = useState();
  const [favourites,setFavourites] = useState([]);
  
  useEffect(()=>{
  async function fetchData(){
    let request = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=4c251dbe9adcfb77bfc88cb84ac9929d&page=${page}`);
    
    setMovies(request.data.results);
    let oldFaviourite = localStorage.getItem('movieapp')
    oldFaviourite = JSON.parse(oldFaviourite) || []  
    console.table(oldFaviourite)
    setFavourites(oldFaviourite)
  }  
  fetchData();
  },[page])
  
  function nextPage(){
    setPage(page + 1)
  }
  
  function prevPage(){
    if(page>1) setPage(page - 1)
  }
  let addToFavourite = (movie)=>{
    let newList = [...favourites,movie]
    setFavourites(newList)
    console.log(favourites)
    localStorage.setItem('movieapp',JSON.stringify(newList) || [])

    
  }
  let removeFromFavourite = (movie)=>{
      let removeItem = favourites.filter((m)=>m.id!=movie.id)
      setFavourites(removeItem)
      console.log(removeItem)
    localStorage.setItem('movieapp',JSON.stringify(removeItem) || [])
  }

  
  return (
    <div>
    <div className="my-5 text-center	text-3xl font-bold text-centre">Trending</div>
    { 
     movies.length == 0 ? <div className='flex justify-center'><TailSpin color ="indigo" height={100} width={100}/></div>:
     <div className="flex flex-wrap justify-center">
     {movies.map((movie)=>(
      <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})]  h-[35vh] w-[350px] bg-center bg-cover m-4 border-purple-600 rounded-xl flex items-end hover:scale-110 ease-in duration-300 delay-50  relative`}

      onMouseEnter={()=>setHover(movie.id)}
      
      onMouseLeave = {() =>setHover("")}>
        {hover==movie.id && <>{ !favourites.find((m)=>m.id==movie.id) ?<div className = "absolute top-2 right-2 p-4 ">
        <img className="h-6"  src={favouriteIcon} onClick={()=>{addToFavourite(movie)}} /></div>:
        <div className = "absolute top-2 right-2 p-4 ">
        <img className="h-6"  src={removeIcon} onClick={()=>{removeFromFavourite(movie)}} /></div>
        }</>}


        <div className=" text-white font-bold text-2xl h-20px w-full bg-indigo-500 p-3 text-center bg-opacity-70 rounded-xl">{movie.title}</div>
      </div>
     )) }
     </div>
    }
    <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />  
    </div>  
  )
}

export default Movies