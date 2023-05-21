import { LandingPage } from './pages/landingPage/LandingPage';
import { useState, useEffect } from "react";


const App = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  
  const toggleLoggedIn = () => {
    setIsUserLoggedIn((isLogged) => !isLogged);
  };

  useEffect(() => {
    console.log('user logg in? ', isUserLoggedIn);
  },[isUserLoggedIn])

  return (
    isUserLoggedIn ? <span>You logged in</span> : <LandingPage  toggleUserLoggedIn={toggleLoggedIn}/>
  )
}

export default App
