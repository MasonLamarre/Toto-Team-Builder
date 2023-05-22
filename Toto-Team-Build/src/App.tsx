import { LandingPage } from './pages/landingPage/LandingPage';
import { useState, useEffect } from "react";
import { HomePage } from './pages/teamBuilderPage/HomePage';
import { userInfo } from './util/pokemonTypes';


const App = () => {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState<userInfo | undefined>()

  const toggleLoggedIn = () => {
    setIsUserLoggedIn((isLogged) => !isLogged);
  };

  useEffect(() => {
    console.log('user logg in? ', isUserLoggedIn);
  },[isUserLoggedIn])

  return (
    isUserLoggedIn ? <HomePage toggleUserLoggedIn={toggleLoggedIn}  userInfo={userInfo}/> : <LandingPage setUserInfo={setUserInfo}  toggleUserLoggedIn={toggleLoggedIn}/>
  )
}

export default App
