import React from 'react';
import Header from '../../../Components/Header';

const SalesTemplate = () => {
    return (
        <>
        <Header text ={"매상 통계"} restaurantName = {localStorage.getItem('storeName')}/>
        </>
    );
};

export default SalesTemplate