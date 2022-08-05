import React from 'react'

function Pagination({page,nextPage,prevPage}) {
  return (
    <div className='flex justify-center	'>
      <button className='px-5 py-2 my-5 mx-0.4 border-y-2	border-l-2  border-violet-800' onClick={()=>{prevPage()}}>Prev </button>
      <button className='px-5 py-2 my-5 mx-0.4 border-2  	 border-violet-800	'	>{page}</button>
      <button className='px-5 py-2 my-5 mx-0.4 border-y-2	border-r-2  border-violet-800	' onClick={()=>{nextPage()}}	>Next</button>
    </div>
  )
}

export default Pagination