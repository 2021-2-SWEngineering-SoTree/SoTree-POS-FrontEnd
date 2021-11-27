/* eslint-disable no-lone-blocks */
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import Sign from '../../../Assets/sign.png';
import axios from 'axios';


const Templet = styled.div`
    background-color:#474D4E;
    width : 100%;
    height : 100%;
`

const Header = styled.div`
    color : white;
    font-size : 1.5rem;
`;

const ExitBtn = styled.button`
    float : right;
    height : 100%;
    font-size : 1.3rem;
`

const Center = styled.div`
    background-color:#ffffff;
    margin-left : 0.5%;
    width : 99%;
    height : 92%;
    align-items : center;
`;

const MidContent = styled.div`
    height : 13%;
    width  : 100%;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const MidBtn = styled.button`
    & + & {
        margin-left : 0.5rem;
    }
    width : 13%;
    height : 5vh;
    background-color : #D7FAFF;
    border-radius : 10px;
    font-size : 1.2rem;
    &:hover {
        background: #8DDEE9;
    }
`

const BlockDiv = styled.div`
    dispaly : flex;
    flexDirection : column;
    justify-content : center;
    width : 100%;
`;

const BottomBottomRightDiv = styled.div`
    text-align : center;
    display : flex;
    flexDirection : column;
    justify-content : center;
    margin-top : 2rem;
`;

const BottomRightBtn = styled.button`
    height : 8vh;
    width : 20vh;
    border-radius : 12px;
    font-size : 1.5rem;
    background : #474D4E;
    color : white;
    margin-left : 3.5rem;
    margin-right : 3.5rem;
`
const TextDiv = styled.h2`
    margin-left : 10rem;
    width : 100%;
`;

const ItemDiv = styled.div`
    height : 100%;
    width : 100%;
`;

const DisCount = ({orderId, payedPrice, all, notTotalPrice, totalPrice, setpayPrice, setClick, setDisplay, setAllprice}) => {

    const [totalprice,setTotalprice]=useState(totalPrice);
    
      
    return (
        <>
            <Templet>
                <Header>&nbsp;할인적용
                    <ExitBtn onClick={()=>{
                        setDisplay && setDisplay(0);
                        !setDisplay && setClick(0)
                    }}>X</ExitBtn>
                </Header>
                <Center>
                    <ItemDiv>
                        <BlockDiv>
                            
                            <TextDiv style={{paddingTop:'5vh'}}>+ 전체 고정 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={''}>1,000원</MidBtn>
                                    <MidBtn onClick={''}>2,000원</MidBtn>
                                    <MidBtn onClick={''}>3,000원</MidBtn>
                                    <MidBtn onClick={''}>4,000원</MidBtn>
                                    <MidBtn onClick={''}>5,000원</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BlockDiv>
                            <TextDiv>+ 전체 비율 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={''}>5%</MidBtn>
                                    <MidBtn onClick={''}>10%</MidBtn>
                                    <MidBtn onClick={''}>15%</MidBtn>
                                    <MidBtn onClick={''}>20%</MidBtn>
                                    <MidBtn onClick={''}>25%</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <div style={{
                            textAlign : 'center',
                            width : '85%', borderBottom : '1px solid black', margin : '2rem 5rem'}}/>
                        <BlockDiv>
                            <TextDiv>+ 선택 고정 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={''}>1,000원</MidBtn>
                                    <MidBtn onClick={''}>2,000원</MidBtn>
                                    <MidBtn onClick={''}>3,000원</MidBtn>
                                    <MidBtn onClick={''}>4,000원</MidBtn>
                                    <MidBtn onClick={''}>5,000원</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BlockDiv>
                            <TextDiv>+ 선택 비율 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={''}>5%</MidBtn>
                                    <MidBtn onClick={''}>10%</MidBtn>
                                    <MidBtn onClick={''}>15%</MidBtn>
                                    <MidBtn onClick={''}>20%</MidBtn>
                                    <MidBtn onClick={''}>25%</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BottomBottomRightDiv>
                            <BottomRightBtn>전체 할인 취소</BottomRightBtn>
                            <BottomRightBtn>선택 할인 취소</BottomRightBtn>
                        </BottomBottomRightDiv> 
                    </ItemDiv>
                 </Center>

            </Templet>
        </>
    )
};

export default DisCount;