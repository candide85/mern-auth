import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
    <header>
      <Header  />
    </header>
      <Routes>
        <Route  path='/'  element={<Home   />}  />
        <Route  path='/about'  element={<About   />}  />
        <Route  path='/profile'  element={<Profile   />}  />
        <Route  path='/signin'  element={<SignIn   />}  />
        <Route  path='/signup'  element={<SignUp   />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
 