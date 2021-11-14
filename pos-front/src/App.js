import './App.css';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {SignUp, FindUserInfo} from './Pages/Login';
import MainPage from './Pages/MainPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';
import MenuTemplate from './Pages/RestaurantManagement/MenuManagement/MenuTemplate';
import SeatTemplate from './Pages/RestaurantManagement/SeatManangement/SeatTemplate';
import StockTemplate from './Pages/RestaurantManagement/StockManagement/StockTemplate';
import RestaurantManagementPage from './Pages/RestaurantManagement/ResturantManagementPage';
import RestaurantSalesHomePage from './Pages/RestaurantSalesHome/RestaurantSalesHomePage';
import MenuAvgTimeTemplate from './Pages/RestaurantSalesHome/MenuAvgTime/MenuAvgTimeTemplate';
import MenuSalesTemplate from './Pages/RestaurantSalesHome/MenuSales/MenuSalesTemplate';
import SalesTemplate from './Pages/RestaurantSalesHome/Sales/SalesTemplate';
import ClosePage from './Pages/Close/ClosePage';
import EmployeeManagementPage from './Pages/EmployeeManagement/EmployeeManagementPage';
import CurrentSeatInfoPage from './Pages/Sale/CurrentSeatInfoPage';
import SalePage from './Pages/Sale/SalePage';
import StockDetail from './Pages/RestaurantManagement/StockManagement/StockDetail';
import { useState } from 'react';
import { CashPay } from './Pages/Sale/Pay';


function App() {

  const [isLogin, setIsLogin] = useState(false);

  const loginCallBack = (loginCheck)=>{
    setIsLogin(loginCheck);
    console.log("LoginCallback");
  }

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage loginCallBack={loginCallBack}/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/findUserInfo" element={<FindUserInfo/>}/>
            <Route path="/homePage" element={localStorage.getItem('Token') ? <HomePage/> : <Navigate replace to='/'/> }/>
            <Route path="/restaurantManagement/menu" element={localStorage.getItem('Token') ? <MenuTemplate/> : <Navigate replace to='/'/> } />
            <Route path="/restaurantManagement/stock" element={localStorage.getItem('Token') ?  <StockTemplate/> : <Navigate replace to='/'/>} />
            <Route path="/restaurantManagement/seat" element={localStorage.getItem('Token') ?  <SeatTemplate/> : <Navigate replace to='/'/>} />  
            <Route path="/restaurantManagement" element={localStorage.getItem('Token') ? <RestaurantManagementPage/> : <Navigate replace to='/'/> } />
            <Route path="/restaurantSalesHome" element={localStorage.getItem('Token') ? <RestaurantSalesHomePage/> : <Navigate replace to='/'/> } />
            <Route path="/restaurantSalesHome/menuavgtime" element={localStorage.getItem('Token') ? <MenuAvgTimeTemplate/> : <Navigate replace to='/'/> } />
            <Route path="/restaurantSalesHome/menusales" element={localStorage.getItem('Token') ? <MenuSalesTemplate/> : <Navigate replace to='/'/> } />
            <Route path="/restaurantSalesHome/sales" element={localStorage.getItem('Token') ? <SalesTemplate/> : <Navigate replace to='/'/> } /> 
            <Route path="/CurrentSeatInfo" element={localStorage.getItem('Token') ? <CurrentSeatInfoPage/> : <Navigate replace to='/'/> }/>
            <Route path="/sale" element={localStorage.getItem('Token') ? <SalePage/> : <Navigate replace to='/'/> }/>
            <Route path="/close" element={localStorage.getItem('Token') ? <ClosePage/>: <Navigate replace to='/'/> }/>
            <Route path="/employeeManagement" element={localStorage.getItem('Token') ? <EmployeeManagementPage/>: <Navigate replace to='/'/> }/>
            <Route path="/restaurantManagement/stock/stockDetail" element={localStorage.getItem('Token') ? <StockDetail/> : <Navigate replace to='/'/> }/>
            <Route path="/sale/cashPay" element={localStorage.getItem('Token') ? <CashPay/>: <Navigate replace to='/'/> }/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
