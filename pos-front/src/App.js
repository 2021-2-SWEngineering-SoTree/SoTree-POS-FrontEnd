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

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/findUserInfo" element={<FindUserInfo/>}/>
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/menu" element={<MenuTemplate/>} />
            <Route path="/stock" element={<StockTemplate/>} />
            <Route path="/seat" element={<SeatTemplate/>} />  
            <Route path="/restaurantManagement" element={<RestaurantManagementPage/>} />
            <Route path="/restaurantSalesHome" element={<RestaurantSalesHomePage/>} />
            <Route path="/stock" element={<StockTemplate/>} />
            <Route path="/seat" element={<SeatTemplate/>} /> 
            <Route path="/menuavgtime" element={<MenuAvgTimeTemplate/>} />
            <Route path="/menusales" element={<MenuSalesTemplate/>} />
            <Route path="/sales" element={<SalesTemplate/>} /> 
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
