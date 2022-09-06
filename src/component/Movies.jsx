import axios from 'axios';
import React, {useState,useEffect} from 'react'
import {TailSpin	} from 'react-loader-spinner'
import Pagination from './Pagination'
import favouriteIcon from './heart.png'
import removeIcon from './remove.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
function Movies() {
  
  const [movies,setMovies] = useState([]);
  const [page,setPage] = useState(1);
  const [hover,setHover] = useState();
  const [favourites,setFavourites] = useState([]);
  const [sliderImage,setSliderImage] = useState([])
  
  useEffect(()=>{
  async function fetchData(){
    let request = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=4c251dbe9adcfb77bfc88cb84ac9929d&page=${page}`);
    setMovies(request.data.results);
    console.log(request.data.results)
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
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   className: "slider variable-width",
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  // };
  
  return (
    <div>
    <div className="my-5 text-center	text-3xl font-bold text-centre">Trending</div>
    {/* <div style={{margin:"1rem 0",maxWidth:"100vw",}}>
    <Slider {...settings}>
           <div>
           <img style={{height:"65vh", width:"95vw",margin:"auto",objectFit: "fill"}} src="https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg"  />  
           </div>
           <div>
           <img style={{height:"65vh", width:"95vw",margin:"auto",objectFit: "fill"}} src="https://image.tmdb.org/t/p/original/wDyM1lIIgK4RIDAgr8iuZe9N1cf.jpg" />
           </div>
           <div>
           <img style={{height:"65vh", width:"95vw",margin:"auto",objectFit: "fill"}} src="https://image.tmdb.org/t/p/original/6cpRpfD3isvluFwXDGSiDVyibPJ.jpg" />
           </div>
    </Slider> */}
          
      
    {/* </div> */}
    { 
     movies.length == 0 ? <div className='flex justify-center'><TailSpin color ="indigo" height={100} width={100}/></div>:
     <div className="flex flex-wrap justify-center">
     {movies.map((movie)=>(
      <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})]  h-[35vh] w-[350px] bg-center bg-cover m-4 border-purple-600 rounded-xl flex items-end hover:scale-110 ease-in duration-300 delay-50  relative`}

      onMouseEnter={()=>setHover(movie.id)}
      
      onMouseLeave = {() =>setHover("")}>
        {hover==movie.id && <>{ !favourites.find((m)=>m.id==movie.id) ?<div className = "absolute top-2 right-2 p-4" style={{color:"white"}}><FontAwesomeIcon icon={faHeart} onClick={()=>{addToFavourite(movie)}} /></div>:
        <div className = "absolute top-2 right-2 p-4 " style={{color:"#f87171"}}><FontAwesomeIcon icon={faHeart} onClick={()=>{removeFromFavourite(movie)}} /></div>
        }</>}


        <div className=" text-white font-bold text-2xl h-20px w-full bg-indigo-500 p-3 text-center bg-opacity-70 rounded-t-none	rounded-b-xl">{movie.title}</div>
      </div>
     )) }
     </div>
    }
    <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />  
    </div>  
  )
}

export default Movies