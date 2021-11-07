import React from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';


const StockDetail = () => {
    return (
        <div>
            <Header text ={"재고 관리"} restaurantName = {"혜민이네 돈까스"}/>
            <h1 style={{textAlign:'center'}}>재고관리 => 재고추적 홈페이지</h1>
        </div>
    );
};

export default StockDetail;