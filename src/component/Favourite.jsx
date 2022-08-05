import React,{useState,useEffect} from 'react'
import Pagination from './Pagination';

function Favourite() {
    let genreids = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }
    const [currentGenre,setCurrentGenre] = useState("All Genre")
    const [favourites,setFavourites] = useState([]);
    const [genres,setGenres] = useState([])
    const [rating,setRating] = useState(0)
    const [popularity,setPopularity] = useState(0)
    const [search,setSearch] = useState("")
    const [row,setRow] = useState(4)
    const [page,setPage] = useState(1)
    useEffect(()=>{
    let oldFaviourite = localStorage.getItem('movieapp')
    oldFaviourite = JSON.parse(oldFaviourite)  
    setFavourites(oldFaviourite)
    },[])
    
    //setGenres
    useEffect(()=>{
        let temp =  favourites && favourites.map((movie) => genreids[movie.genre_ids[0]])
        console.table(temp)
        temp = new Set(temp)
        setGenres(["All Genre",...temp])
    },[favourites])
    let filteredFavourie = [];
    
    let removeFromFavourite = (movie)=>{
        let removeItem = favourites && favourites.filter((m)=>m.id!=movie.id)
        setFavourites(removeItem)
        console.log(removeItem)
      localStorage.setItem('movieapp',JSON.stringify(removeItem) || [])
    }
    console.log(currentGenre)
  
    filteredFavourie = currentGenre=='All Genre' ? favourites: favourites.filter((movie)=>
    genreids[movie.genre_ids[0]]==currentGenre)
    console.table(filteredFavourie)
    
    if(rating==1){
        filteredFavourie = filteredFavourie.sort(function(objA,objB){
            return objA.vote_average - objB.vote_average
        })
    }
    else if(rating == -1){
        filteredFavourie = filteredFavourie.sort(function (objA,objB){
            return objB.vote_average - objA.vote_average
        })
    }
    if(popularity==1){
        filteredFavourie = filteredFavourie.sort(function(objA,objB){
            return objA.popularity - objB.popularity
        })
    }
    else if( popularity == -1){
        filteredFavourie = filteredFavourie.sort(function (objA,objB){
            return objB.popularity - objA.popularity
        })
    }
    // search 
    filteredFavourie = filteredFavourie && filteredFavourie.filter((movie)=>
    movie.title.toLowerCase().includes(search.toLowerCase())
    )
    //pagination 
    let pageShow = Math.ceil(filteredFavourie && filteredFavourie.length / row)
    let start = (page - 1) * row
    let end = Number(start) + Number(row)
     
    filteredFavourie = filteredFavourie && filteredFavourie.slice(start,end)
    
    function nextPage(){
      if(page<pageShow)
      setPage(page + 1)
    }
    
    function prevPage(){
      if(page>1) setPage(page - 1)
    }



  return (
    <>
        <div className="flex justify-center flex-wrap">
        {genres.map((genre)=><button className={ currentGenre==genre ? "py-1 px-2 m-2 mx-0.4 	bg-indigo-500 text-white rounded-3xl ":" py-1 px-2 m-2 mx-0.4 border-2	border-indigo-500 text-indigo-500	 rounded-3xl hover:bg-indigo-400 text-white "} onClick={()=>{
          setCurrentGenre(genre)
          setPage(1)
          }}>{genre}</button>)}
        </div>
        <div className='text-center'>
            <input type ="text" placeholder='Search' className="text-center p-2 m-1 border-2" onChange={(e)=>setSearch(e.target.value)}></input>
            <input type ="number" value={row} placeholder='Rows' className="text-center p-2 m-1 border-2" onChange={(e)=>setRow(e.target.value)}></input>
        </div>
        <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-4">
        <div className="py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 min-w-full">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className='flex'>
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'
                       onClick={()=>{
                        setPopularity(0)
                        setRating(-1)}}
                      />
                      Rating
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                     className='ml-2 mr-2'
                     onClick={()=>{
                        setPopularity(0)
                        setRating(1)}} 

                        />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className='flex'>
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png'
                      className='mr-2'
                      onClick={()=>{
                        setRating(0)
                        setPopularity(-1)
                       }}

                       />
                      Popularity
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2'
                        onClick={()=>{
                        setRating(0)
                        setPopularity(1)
                       }}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {filteredFavourie && filteredFavourie.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                          <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 ">{movie.vote_average}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.popularity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {genreids[movie.genre_ids[0]]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button href="#" className="text-red-600 hover:text-red-900" onClick={()=>removeFromFavourite(movie)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />   
    </>
  )
}

export default Favourite