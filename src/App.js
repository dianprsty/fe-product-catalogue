import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Home from './pages/Home';
import CatalogProduct from './pages/CatalogProduct';
import DetailProduct from './pages/DetailProduct';

function App() {
  return (
    <div >
      <BrowserRouter>
        <GlobalProvider >
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/catalog' element={<CatalogProduct/>} />
            <Route path='/product/:id' element={<DetailProduct />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
          <Footer />
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
