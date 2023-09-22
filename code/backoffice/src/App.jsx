import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './composants/Menu'
import { AuthProvider } from './composants/context/authContext';

function App() {

  return (<>
      <AuthProvider>
          <Menu/>
          <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
