import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {SignUp, FindUserInfo} from './Pages/Login';
import MainPage from './Pages/MainPage';
import HomePage from './Pages/HomePage';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/findUserInfo" element={<FindUserInfo/>}/>
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
