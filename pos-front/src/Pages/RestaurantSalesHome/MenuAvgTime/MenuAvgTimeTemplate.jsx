import React from 'react';
import Header from '../../../Components/Header';

const MenuAvgTimeTemplate = () => {
    return (
        <>
        <Header text ={"메뉴별 평균 시간 정보"} restaurantName = {localStorage.getItem('storeName')}/>
        </>
    );
};

export default MenuAvgTimeTemplate;