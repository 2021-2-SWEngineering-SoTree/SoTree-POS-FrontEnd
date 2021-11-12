import React from 'react';
import Header from '../../../Components/Header';
import { Link } from 'react-router-dom';

const SeatTemplate = () => {
    return (
        <>
        <Header text ={"좌석 관리"} restaurantName = {localStorage.getItem('storeName')}/>
        </>
    );
};

export default SeatTemplate;