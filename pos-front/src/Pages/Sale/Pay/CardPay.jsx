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
    
`;

const CostDiv = styled.div`
    border : 1px black solid;
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
    height : 95%;
    margin : 0 auto;
`
const InputDiv = styled.div`
    & + & {
        margin-top : 1rem;
    }
    width : 13rem:
    margin : 1rem;
    display : flex;
`;

const InputLabel = styled.label`
    font-size : 1.3rem;
    margin-left : 3rem;
`;

const InputLabel2 = styled.label`
    font-size : 1.3rem;
    margin-left : 6rem;
`;

const InputNumber = styled.input`
    background-color : #F2F8F9;
    width : 55%;
    margin-left : 3%;
    border : 1px solid black;
    text-align:right;
`;

const MonthSelector = styled.select`
    background-color : #F2F8F9;
    margin-left : 3%;
    text-align : center;
`;

const InputSign = styled.div`
    width : 55%;
    margin-left : 3%;
    height : 6rem;
    background-color : #F2F8F9;
    border : 1px solid black;
`

const Img = styled.img`
    width : 100%;
    height : 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const BottomRightBtn = styled.button`
    height : 46%;
    width : 95%;
    border-radius : 12px;
    font-size : 1.5rem;
    & + & {
        margin-top : 0.5rem;
    }
`

//랜덤카드번호
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
}

const CardPay = ({eId, orderId, payedPrice, all, notTotalPrice, totalPrice, setpayPrice, setClick, setDisplay, setAllprice}) => {

    const [totalprice,setTotalprice]=useState(totalPrice);
    const [cardNum,setCardNum]=useState();
    const [month,setMonth]=useState();
    const [getSign, setGetSign]=useState(false);
    const [pay,setPay]=useState(false);
    const [pay2,setPay2]=useState(false);

    const getPaid = async ()=>{
        const managerId = window.localStorage.getItem('managerId');
        console.log(managerId);
        
        //직원 ID
        const data = JSON.stringify({
            orderId : orderId,
            employeeId : eId,
            branchId: managerId,
            payTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            method : '카드',
            finalPrice : totalPrice,
        });

        //일반 카드결제
        await axios.post('http://localhost:8080/payment/makePayment',data, {
            headers : {
            "Content-Type" : "application/json",
        }}).then(async (res)=>{
            const data2 = JSON.stringify({
                paymentId: res.data,
                branchId : managerId
            
            });
            await axios.post('http://localhost:8080/payment/sendToCompany',data2, {
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                { payedPrice ? setpayPrice(+payedPrice+totalprice):setpayPrice(totalprice);}
                {notTotalPrice && notTotalPrice(all-totalprice);}
                {setAllprice && setAllprice(all-totalprice);}
                console.log(res,res.data);
                alert('카드결제가 완료되었습니다');
                setPay(true);
                
            }).catch(e=>{
                console.log(e);
                alert('결제가 실패하였습니다');
            })
        }).catch(e=>{
            console.log(e);
            alert('결제가 실패하였습니다');
        })
        
    }

    const btnClick=()=>{
        console.log(month);
        if(month!=undefined && month!=''){
            getPay(function() {
            const num = generateRandomCode(16);
            num.replace('0','1');
            console.log(num);
            setCardNum(+num);
            // const rand = Math.floor(Math.random()*12)+1;
            // doOpenCheck(rand);
            {totalprice>=50000 && setGetSign(true);}
            })
        }
        else alert("할부 개월을 입력해주세요");
    
    };

    const getPay= (callback)=> {
        setTimeout(function(){
          alert('카드를 입력받았습니다');
          callback();
          setTimeout(async function(){
            if (!notTotalPrice) {
                getPaid();
                alert('결제!');
            }
            else {
                //복합결제
                //totalprice
                const managerId = window.localStorage.getItem('managerId');
                const data = JSON.stringify(
                    {
                        payTime:new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
                        method : '카드',
                        price : totalprice,
                        branchId : managerId
                    }
                );
                console.log(data);
                await axios.post('http://localhost:8080/payment/combinePay',data, {
                headers : {
                "Content-Type" : "application/json",
                }}).then((res)=>{
                    { payedPrice ? setpayPrice(+payedPrice+totalprice):setpayPrice(totalprice);}
                    {notTotalPrice && notTotalPrice(all-totalprice);}
                    {setAllprice && setAllprice(all-totalprice);}
                    console.log(res,res.data);
                    setPay2(true);
                    alert('카드결제가 완료되었습니다');
                }).catch(e=>{
                    console.log(e);
                    alert('결제가 실패하였습니다');
                })
            }
          },2000)
        }, 3000);
    }

    const doOpenCheck=(index)=>{
        console.log(index);
        const obj = document.getElementsByName("month");
        console.log(obj[0],obj[1]);
        for(let i=0; i<obj.length; i++){
            if(i === index){
                obj[i].selected = true;
            }
            else obj[i].selected=false;
        }
        console.log(obj[0],obj[1]);
    }

    useEffect(()=>{
    },[]);
      
    return (
        <>
            <Templet>
                <Header>&nbsp;신용카드 결제
                    <ExitBtn onClick={()=>{
                        (!pay&&!pay2) && alert("결제가 아직 완료되지 않았습니다");
                        (pay||pay2) && setDisplay && setDisplay(0);
                        (pay||pay2) && !setDisplay && setClick(0)
                    }}>X</ExitBtn>
                </Header>
                <Center>
                    <Content>
                        <TopContent>
                            <h1>+ <span style={{color:'red'}}>결제 금액</span></h1>
                            <CostDiv>{totalprice}</CostDiv>
                        </TopContent>
                        <BottomContent>
                            <BottomInContent>
                                <h1>+ 카드 정보</h1>
                                <InputDiv>
                                    <InputLabel>카드 번호</InputLabel>
                                    <InputNumber value={cardNum}></InputNumber>
                                </InputDiv>
                                <InputDiv>
                                    <InputLabel>할부 개월</InputLabel>
                                    <MonthSelector value={month} onChange={(e)=>{setMonth(e.target.value)}}>
                                        <option name="month" value="">---</option>
                                        <option name="month" value="0">X</option>
                                        <option name="month" value="1">1</option>
                                        <option name="month" value="2">2</option>
                                        <option name="month" value="3">3</option>
                                        <option name="month" value="4">4</option>
                                        <option name="month" value="5">5</option>
                                        <option name="month" value="6">6</option>
                                        <option name="month" value="7">7</option>
                                        <option name="month" value="8">8</option>
                                        <option name="month" value="9">9</option>
                                        <option name="month" value="10">10</option>
                                        <option name="month" value="11">11</option>
                                        <option name="month" value="12">12</option>
                                    </MonthSelector>
                                </InputDiv>
                                <InputDiv>
                                    <InputLabel2>서명</InputLabel2>
                                    <InputSign>
                                        {getSign && <Img src={Sign}/>}
                                    </InputSign>
                                </InputDiv>
                            </BottomInContent>
                            <BottomRightBtn onClick={btnClick} style={{marginTop:'-10%',marginLeft:'45%', width:'10rem', height:'4rem',backgroundColor:'#505D5E', color:'white'}}>카드 입력</BottomRightBtn>
                            {pay &&
                            (<BottomRightBtn onClick={()=>{
                                    alert("결제가 완료되어 좌석 화면으로 이동합니다");
                                    window.location.replace("/CurrentSeatInfo"
                            )}} style={{position:'absolute',marginBottom:'10rem',marginLeft:'13%', width:'9rem', height:'3rem',backgroundColor:'#505D5E', color:'white'}}>나가기</BottomRightBtn>
                            )}
                            </BottomContent>
                    </Content>
                </Center>

            </Templet>
        </>
    )
};

export default CardPay;
