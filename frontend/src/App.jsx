import {Route ,Routes } from 'react-router-dom'

// pages :
import SignUp from './pages/signUp'
import LogIn from './pages/logIn'
import IndexPage from './pages/indexPage'
import Dashboard from './pages/dashboard'
import Home from './pages/Home'
import Users from './components/users'
import EditUser from './components/EditUser'

// components : 


function App() {

  return (
    <>
      {/* router */}

      <Routes>
        <Route path='/' element={<IndexPage/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='users'  element={<Users/>}>
            <Route path=':id' element={<EditUser/>}/>
          </Route>
        </Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
