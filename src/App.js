import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import Home from './pages/Home';
import CatalogProduct from './pages/CatalogProduct';
import DetailProduct from './pages/DetailProduct';
import SettingProduct from './pages/SettingProduct';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { Spin } from 'antd';
import ProtectedRoute from './wrapper/ProtectedRoute';

function App() {
  const {isLoading, ctxHolder} = useContext(GlobalContext)
  return (
    <div >
      <Spin spinning={isLoading} size='large'>
          {ctxHolder}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/catalog' element={<CatalogProduct/>} />
            <Route path='/product/:id' element={<DetailProduct />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route element={<ProtectedRoute />} >
              <Route path='/setting' element={<SettingProduct />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Spin>
    </div>
  );
}

export default App;
