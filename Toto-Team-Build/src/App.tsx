import { LandingPage } from './pages/landingPage/LandingPage';
import { useState } from "react";


const App = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  
  const toggleLoggedIn = () => {
    setIsUserLoggedIn((isLogged) => !!isLogged);
  };

  return (
    isUserLoggedIn ? <span>You logged in</span> : <LandingPage  toggleUserLoggedIn={toggleLoggedIn}/>
  )
}

export default App
