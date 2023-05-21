import { useState } from 'react'
import { joinTailwindClasses } from './util/joinTailwindClasses'
import { buttonStyles } from './util/sharedStyles'
import { accountDatabaseCommands } from './util/databaseCommands/account'
import { CreateAccount } from './pages/CreateAccount'
import { Login } from './pages/Login'


const App = () => {
  return <Login />
}

export default App
