import React from 'react';
import Header from '../../Components/Header';

const ClosePage = () => {
    return (
        <>
        <Header text ={"마감"} restaurantName = {localStorage.getItem('storeName')}/>
        </>
    );
};

export default ClosePage