import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './utils/useAuth';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import QuestionId from './pages/QuestionId/QuestionId';
import Dashboard from './pages/Dashboard/Dashboard';
import Edit from './pages/Dashboard/Edit';

function App() {
  const { auth } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ !auth ? <Login /> : <Navigate to='/' /> } />
          <Route path='/register' element={ !auth ? <Register /> : <Navigate to='/' /> } />
          <Route path='/question/:id' element={ auth ? <QuestionId /> : <Navigate to='/login' /> } />
          <Route path='/dashboard' element={ auth ? <Dashboard /> : <Navigate to='/login' /> } />
          <Route path='/edit/:id' element={ auth ? <Edit /> : <Navigate to='/login' /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
