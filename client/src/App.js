 import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
 } from 'react-router-dom'
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import { useSelector } from 'react-redux';
import Doctor from './pages/doctor';
import Medicine from './pages/medicine';
import Appointment from './pages/appointment';
import { fetchUser } from './api/auth';
import { useEffect, useState } from 'react';
import Layout from './components/layout';


const PrivateRoutes = () => {
 const { isAuth } = useSelector(state => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  return <>{!isAuth ? <Outlet /> : <Navigate to='/appointment' />}</>
}; 
 
 const App = () => {

  const [name, setName] = useState('');
  const { isAuth } = useSelector(state => state.auth);

  const getName = async () => {
        try {
            const { data } = await fetchUser();
            const firstAndLastName = `${data[0].firstname} ${data[0].lastname}`
            setName(firstAndLastName);
            console.log('fetching name')
        } catch (err) {
            console.error(err.response);
        }
    };

    useEffect(() => {
      if(isAuth) {
          getName();
      }
      console.log(name);
  }, [])

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home name={name}/>}/>

        <Route element= {<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard name={name}/>}/>
          <Route path='/doctor' element={<Doctor name={name}/>}/>
          <Route path='/medicine' element={<Medicine name={name}/>}/> 
          <Route path='/appointment' element={<Appointment name={name}/>}/>
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/login' element={<Login getName={getName} />}/>
          <Route path='/register' element={<Register />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  ) 
 }; 

 export default App;