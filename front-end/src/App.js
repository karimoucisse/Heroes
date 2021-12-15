import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Hero from './pages/Hero'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<Home/>}/>
          <Route path = '/hero/:slug' element = {<Hero/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
