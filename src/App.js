import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Index from './pages/courses/Index';
import Home from './pages/Home';
import CoursesShow from './pages/courses/Show'

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    
    if (localStorage.getItem('token')){
      setAuthenticated(true);
    }

  }, [])

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/courses' element={<Index/>} />
          <Route path='/courses/:id' element={<CoursesShow/>} />
        </Routes>
    </Router>  
    <Footer/>
    </>
    
  );
}


export default App;
