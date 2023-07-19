import React from 'react'

function Home() {
  return (
    <>
    <h5 className='m-5 text-break'>Welcome to URL shortener App</h5>
    {(localStorage.getItem("loggedUsername")) && <h6 className='my-2'>Hi {localStorage.getItem("loggedUsername")} !</h6>}
    {!(localStorage.getItem("loggedUsername")) && <h6 className='my-2'>Log in to use the app.</h6>} 
    </>
  )
}
export default Home;