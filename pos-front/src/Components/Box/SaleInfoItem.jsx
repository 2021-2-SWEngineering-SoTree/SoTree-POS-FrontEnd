import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width : 25%;
    height : 100%;
    display : flex;
    flex-direction : column;
    border : 1px solid #000000;
`;

const TopDiv = styled.div`
    width : 100%;
    height : 60%;
    color : ${(props)=>props.colors!=="" ? props.colors : "#000000"};
    padding : 10px;
`;

const PriceSpan = styled.span`
    font-weight : bold;
    font-size : 1.4rem;
    margin-right : 0.2rem;
`;

const BottomDiv = styled.div`
    width : 90%;
    height : 60%;
    display : flex;
    flex-direction : row;
    padding : 10px;
    justify-content : space-between;
    margin-bottom : 0.2rem;
`;

const LeftText = styled.div`
    text-align : left;
    font-size : 1.1rem;
`;

const RightText = styled.div`
    text-align : right;
    color : ${(props)=>props.colors!=="" ? props.colors : "#000000"};
    font-weight : bold;
    font-size : 1.1rem;
`;

const SaleInfoItem = ({price,colors, criterion, count}) => {
    return (
        <>
            <Wrapper>
                <TopDiv colors={colors}>
                    <PriceSpan>{price && price.toLocaleString()}</PriceSpan> 원
                </TopDiv>
                <BottomDiv>
                    <LeftText>
                        {criterion}
                    </LeftText>
                    <RightText colors={colors}> 
                        {count}&nbsp;건
                    </RightText>
                </BottomDiv>
            </Wrapper>
        </>
    );
};

export default SaleInfoItem;