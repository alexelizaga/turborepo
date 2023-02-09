import { AppRouter } from './router'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/axios'}>Axios</Link></li>
          <li><Link to={'/query'}>Query</Link></li>
          <li><Link to={'/lazy-query'}>LazyQuery</Link></li>
          <li><Link to={'/mutation'}>Mutation</Link></li>
        </ul>
      </nav>
      <AppRouter/>
    </>
    
  )
}

export default App
