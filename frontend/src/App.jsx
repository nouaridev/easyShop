import {Route ,Routes } from 'react-router-dom'

// pages :
import SignUp from './signUp'
import LogIn from './logIn'
import IndexPage from './indexPage'

// components : 


function App() {

  return (
    <>
      {/* router */}

      <Routes>
        <Route path='/' element={<IndexPage/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App
