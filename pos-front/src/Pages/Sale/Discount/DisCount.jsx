/* eslint-disable no-lone-blocks */
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import Sign from '../../../Assets/sign.png';
import axios from 'axios';
import { useRef } from 'react';


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
    &:focus {
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
    margin-top : 3vh;
`;

const BottomRightBtn = styled.button`
    height : 8vh;
    width : 20vh;
    border-radius : 12px;
    font-size : 1.5rem;
    background : #474D4E;
    color : white;
    margin-top : 1vh;
    margin-left : 2vw;
    margin-right : 2vw;
`
const TextDiv = styled.h2`
    margin-left : 10rem;
    width : 100%;
`;

const ItemDiv = styled.div`
    height : 100%;
    width : 100%;
`;

const DisCount = ({updateDiscount, totalPrice, setClick, setDisplay, totalDiscount}) => {

    const [totalprice,setTotalprice]=useState(totalPrice);
    const [discountSelection, setDisCountSelection] = useState('');

    const discountHandler = () =>{
        if(totalDiscount!==0){
            alert("먼저 적용된 할인을 취소해주세요");
        }else{
            if(discountSelection===''){
                alert("적용할 할인을 선택해주세요");
            }else{
                let prviousPrice = totalPrice;
                let discount_price = discountSelection < 1 ? Math.floor(totalPrice * discountSelection) : totalPrice - discountSelection;
                let message = discountSelection < 1 ? '%할인적용' : '고정할인적용';
                if(discount_price < 0){
                    alert("할인금액은 총 금액을 초과할 수 없습니다.");
                }else{
                    updateDiscount(discount_price, prviousPrice-discount_price, message);
                    setDisCountSelection('');
                    exitHandler();
                }
            }
        }  
    }
    
    const discountRollBackHandler = () =>{
        if(totalDiscount===0){
            updateDiscount(totalPrice,0,'');
        }else{
            updateDiscount(totalPrice+totalDiscount,0,'');
        }
    }
    
    const exitHandler = ()=>{
        setDisplay && setDisplay(0);
        !setDisplay && setClick(0);
    }

    let ref =  useRef();
      

    useEffect(()=>{
        if(discountSelection){
            ref.current.focus();
        }
    },[])
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
                                    <MidBtn onClick={()=>setDisCountSelection(1000)}>1,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(2000)}>2,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(3000)}>3,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(4000)}>4,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(5000)}>5,000원</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BlockDiv>
                            <TextDiv style={{paddingTop:'2vh'}}>+ 전체 고정 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={()=>setDisCountSelection(6000)}>6,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(7000)}>7,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(8000)}>8,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(9000)}>9,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(10000)}>10,000원</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BlockDiv>
                            <TextDiv style={{paddingTop:'2vh'}}>+ 전체 고정 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={()=>setDisCountSelection(15000)}>15,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(20000)}>20,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(30000)}>30,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(40000)}>40,000원</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(50000)}>50,000원</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <div style={{
                            textAlign : 'center',
                            width : '85%', borderBottom : '1px solid black', margin : '2rem 5rem'}}/>
                        <BlockDiv>
                            <TextDiv>+ 전체 비율 할인</TextDiv>
                            <MidContent>
                                    <MidBtn onClick={()=>setDisCountSelection(0.95)}>5%</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(0.9)}>10%</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(0.85)}>15%</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(0.8)}>20%</MidBtn>
                                    <MidBtn onClick={()=>setDisCountSelection(0.75)}>25%</MidBtn>
                            </MidContent>
                        </BlockDiv>
                        <BottomBottomRightDiv>
                            <BottomRightBtn onClick={discountHandler}>전체 할인 적용</BottomRightBtn>
                            <BottomRightBtn onClick={discountRollBackHandler}>전체 할인 취소</BottomRightBtn>
                        </BottomBottomRightDiv> 
                    </ItemDiv>
                 </Center>

            </Templet>
        </>
    )
};

export default DisCount;