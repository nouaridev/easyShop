import {Route ,Routes } from 'react-router-dom'

// pages :
import SignUp from './pages/signUp'
import LogIn from './pages/logIn'
import IndexPage from './pages/indexPage'
import Home from './pages/Home'

// dashboard
import Dashboard from './pages/dashboard'
  // users 
    import Users from './components/dashboard/users/users'
    import EditUser from './components/dashboard/users/EditUser'
    import CreateUser from './components/dashboard/users/createUser'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<IndexPage/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='users'  element={<Users/>}>
            <Route path=':id' element={<EditUser/>}/>
            <Route path='create' element={<CreateUser/>}/>
          </Route>
        </Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </>
  )
}

export default App
