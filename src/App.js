import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//pages
import Index from './pages/courses/Index';
import Home from './pages/Home';
import CoursesShow from './pages/courses/Show';
import CoursesEdit from './pages/courses/Edit';
import CoursesCreate from './pages/courses/Create';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  let protectedRoutes;

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

  if (authenticated){
    protectedRoutes = (
      <>
        <Route path='/courses/create' element={<CoursesCreate/>} />
        <Route path='/courses/:id/edit' element={<CoursesEdit/>} />
        <Route path='/courses/:id' element={<CoursesShow/>} />
      </>
    )
  } 

  return (
    <>
    <Router>
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated}/>
        <Routes>
        <Route path='/' element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated} />} />
        <Route path='/courses' element={<Index authenticated={authenticated}/> }/>
          {protectedRoutes}
        </Routes>
    </Router>  
    <Footer/>
    </>
    
  );
}


export default App;
