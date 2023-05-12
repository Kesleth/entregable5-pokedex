
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import ProtectedAut from './components/auth/ProtectedAut'
import PokemonId from './pages/pokemonId'

function App() {
 

  return (
     <section>
        <Routes>
          <Route path='/' element={<Home />} />
           
           <Route element={<ProtectedAut/>}>

          <Route path='/pokedex' element={<Pokedex />} />

          <Route path='/pokedex/:id' element={<PokemonId/>}/>
          </Route>
        </Routes>
      </section>
      
   
  )
}

export default App
