import Register from './pages/Register';
import Forget from './pages/Forget';
import Reset from './pages/Reset';
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import Profile from './pages/Profile';
import SingleMovie from './pages/SingleMovie';
import BookShow from './pages/BookShow';
import Home from './pages/Home';
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoute from './Components/ProtectedRoute';
import {useSelector} from 'react-redux';


// Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// loadStripe takes your **publishable key**
const stripePromise = loadStripe("pk_test_51S27TUEfoy9M5W9yk7lAM960aMTWFDXtDzrjt0ietjvvUQtOe9mji370er7Jv4ledvGV53Fmi5xGxkqmcVoi6A4F00Vk9eWDOG"); // replace with your pk_test_xxx


function App() {
  const {loading} = useSelector((store) => store.loaders);
  return (
    <div className="App">
      {loading && (
        <div className='loader-container'>{""}
        <div className="loader"></div>{" "}
        </div>
      )}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      <Route path='/forgetpassword' element={<Forget/>}></Route>
        <Route path='/resetpassword' element={<Reset/>}></Route>
        <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}></Route>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
        <Route path='/partner' element={<ProtectedRoute><Partner/></ProtectedRoute>}></Route>
        <Route path='/movie/:id' element={<ProtectedRoute><SingleMovie/></ProtectedRoute>}></Route>
        <Route path='/book-show/:id' element={<ProtectedRoute><Elements stripe={stripePromise}><BookShow/></Elements></ProtectedRoute>}></Route>

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
