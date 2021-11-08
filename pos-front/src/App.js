import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/restaurantManagement/menu" element={<MenuTemplate/>} />
            <Route path="/restaurantManagement/stock" element={<StockTemplate/>} />
            <Route path="/restaurantManagement/seat" element={<SeatTemplate/>} />  
            <Route path="/restaurantManagement" element={<RestaurantManagementPage/>} />
            <Route path="/restaurantSalesHome" element={<RestaurantSalesHomePage/>} />
            <Route path="/restaurantSalesHome/menuavgtime" element={<MenuAvgTimeTemplate/>} />
            <Route path="/restaurantSalesHome/menusales" element={<MenuSalesTemplate/>} />
            <Route path="/restaurantSalesHome/sales" element={<SalesTemplate/>} /> 
            <Route path="/CurrentSeatInfo" element={<CurrentSeatInfoPage/>}/>
            <Route path="/sale" element={<SalePage/>}/>
            <Route path="/close" element={<ClosePage/>}/>
            <Route path="/employeeManagement" element={<EmployeeManagementPage/>}/>
            <Route path="/restaurantManagement/stock/stockDetail" element={<StockDetail/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
