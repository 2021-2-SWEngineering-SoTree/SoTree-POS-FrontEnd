import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import { CashPay, CardPay } from '.';
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
    height : 94%;
    display : flex;
    align-items : center;
`;

const Content = styled.div`
    width : 60%;
    height : 80%;
    margin : 0 auto;
`

const TopContent = styled.div`
    height : 35%;
    width : 100%;
    border-bottom : 1px solid black;
    display : flex;
    align-items : center;
    justify-content : center;
    margin-left : -4%;
    
`;

const CostDiv = styled.div`
    border : 1px soild black;
    background-color : #F2F8F9;
    color : red;
    height : 24%;
    width : 40%;
    text-align:right;
    font-size : 2rem;
    padding-right : 1rem;
    padding-bottom : 0.2rem;
    margin-left : 1rem;
`;

const BottomContent = styled.div`
    height : 65%;
    width : 100%;
    border-top : 1px solid black;
`;

const BottomInContent = styled.div`
    width : 73%;
    height : 60%;
    margin : 0 auto;
    margin-top : 9%;
`
const InputDiv = styled.div`
    & + & {
        margin-top : 1.5rem;
    }
    width : 10rem:
    margin : 1rem;
    display : flex;
`;

const InputLabel = styled.button`
    width : 5.4rem;
    height : 4rem;
    font-size : 1.1rem;
    margin-left : 3rem;
    border-radius : 25px;
    background-color : #D7FAFF;
`;

const InputNumber = styled.input`
    background-color : #F2F8F9;
    width : 55%;
    margin-left : 7%;
    margin-top:2%;
    height : 2.4rem;
    font-size : 1.8em;
    text-align:right; 
    font-weight : bold;
`;


const MultiPay = ({orderId, payedPrice, notTotalPrice, totalPrice, setpayPrice, setClick}) => {

    const [totalprice,setTotalPrice]=useState(totalPrice);
    const [cash,setCash]=useState();
    const [card,setCard]=useState();

    const onChangeCash=(e)=>{
        setCash(e.target.value);
        setCard(totalprice-e.target.value);
    }

    const onChangeCard=(e)=>{
        setCard(e.target.value);
        setCash(totalprice-e.target.value);
    }

    const finish= async ()=>{
        let managerId = window.localStorage.getItem('managerId');

        const data = JSON.stringify({
            orderId : orderId,
            employeeId : 1,
            branchId: managerId,
            payTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            method : '복합'
        });

        await axios.post('http://localhost:8080/payment/makePayment',data, {
            headers : {
            "Content-Type" : "application/json",
        }}).then(async (res)=>{
            const data2 = JSON.stringify({
                paymentId: 1,
                branchId : managerId
            
            });
            await axios.post('http://localhost:8080/payment/sendToCompany',data2, {
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                alert('결제가 모두 완료되었습니다');
            }).catch(e=>{
                console.log(e);
                alert('결제가 실패하였습니다');
            })
        }).catch(e=>{
            console.log(e);
            alert('결제가 실패하였습니다');
        })
        setClick(0);
    }
    useEffect(()=>{
        totalprice===0 && finish();
    },[totalprice]);

    const [display,setDisplay]=useState(0);

    return (
        <>
            {display===0 && 
                <Templet>
                    <Header>&nbsp;복합 결제
                        <ExitBtn onClick={()=>setClick(0)}>X</ExitBtn>
                    </Header>
                    <Center>
                        <Content>
                            <TopContent>
                                <h1>+ <span style={{color:'red'}}>남은 금액</span></h1>
                                <CostDiv>{totalprice}</CostDiv>
                            </TopContent>
                            <BottomContent>
                                <BottomInContent>
                                    <InputDiv>
                                        <InputLabel onClick={()=>{setDisplay(1)}}>현 금</InputLabel>
                                        <InputNumber onChange={onChangeCash} value={cash}></InputNumber>
                                    </InputDiv>
                                    <InputDiv>
                                        <InputLabel onClick={()=>{setDisplay(2)}}>신용카드</InputLabel>
                                        <InputNumber onChange={onChangeCard} value={card}></InputNumber>
                                    </InputDiv>                                    
                                </BottomInContent>
                                <center>
                                    <h3>현금 클릭시, 현금결제 UI로 이동<br/>신용카드 클릭 시, 신용카드결제 UI로 이동</h3>
                                </center>
                            </BottomContent>
                        </Content>
                    </Center>
                </Templet>
            }
            {display===1 && <CashPay all={totalprice} payedPrice={payedPrice} notTotalPrice={notTotalPrice} totalPrice={cash} setAllprice={setTotalPrice} setpayPrice={setpayPrice} setDisplay={setDisplay}/>}
            {display===2 && <CardPay all={totalprice} payedPrice={payedPrice} notTotalPrice={notTotalPrice} totalPrice={card} setAllprice={setTotalPrice} setpayPrice={setpayPrice} setDisplay={setDisplay}/>}
        </>
    )
};

export default MultiPay;