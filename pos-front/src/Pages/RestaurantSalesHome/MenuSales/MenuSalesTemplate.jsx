import React from 'react';
import Header from '../../../Components/Header';

const MenuSalesTemplate = () => {
    return (
        <>
        <Header text ={"메뉴 통계"} restaurantName = {localStorage.getItem('storeName')}/>
        </>
    );
};

export default MenuSalesTemplate