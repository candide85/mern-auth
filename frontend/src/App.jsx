import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
    <header>
      <Header  />
    </header>
      <Routes>
        <Route  path='/'  element={<SignUp   />}  />
        <Route  path='/signin'  element={<SignIn   />}  />
        <Route element={<PrivateRoute  />}>
          <Route  path='/home'  element={<Home   />}  />
          <Route  path='/about'  element={<About   />}  />
          <Route  path='/profile'  element={<Profile   />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
 