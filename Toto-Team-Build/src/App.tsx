import { useState } from 'react'
import { joinTailwindClasses } from './util/joinTailwindClasses'
import { buttonStyles } from './util/sharedStyles'
import { accountDatabaseCommands } from './util/databaseCommands/account'
import { CreateAccount } from './pages/CreateAccount'


const App = () => {
  return <CreateAccount />
}

export default App
