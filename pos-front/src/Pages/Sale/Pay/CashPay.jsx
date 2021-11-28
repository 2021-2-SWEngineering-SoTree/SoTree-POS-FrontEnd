/* eslint-disable no-lone-blocks */
import styled from 'styled-components';
import React, {useState, useEffect, memo} from 'react';
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
    border : 1px solid black;
`

const TopContent = styled.div`
    height : 35%;
    width : 100%;
    border-bottom : 1px solid black;
    display : flex;
    align-items : center;
    justify-content : center;
    
`;

const TopLeft=styled.div`
    width : 70%;
`;

const TopLeftWrapper=styled.div`
    & + & {
        margin-top : -3%;
    }
    display:flex;
    margin-left : 9%;
`

const TopRightBtn=styled.button`
    background-color:#474D4E;
    width : 26%;
    height : 90%;
    margin : 0.5rem;
    border-radius : 25px;
    color : white;
    font-size : 2rem;
`

const CostDiv = styled.div`
    border : 1px soild black;
    background-color : #F2F8F9;
    height : 2rem;
    width : 65%;
    text-align:right;
    font-size : 1.5rem;
    padding-right : 0.5rem;
    padding-bottom : 0.2rem;
    margin-left : 1rem;
    margin-top : 1rem;
`;

const MidContent = styled.div`
    height : 13%;
    width : 100%;
    border-top : 1px solid black;
    border-bottom : 1px solid black;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const BottomContent = styled.div`
    height : 65%;
    width : 100%;
    border-top : 1px solid black;
`;

const BottomInContent = styled.div`
    width : 77%;
    height : 100%;
    margin : 0 auto;
    margin-top : 2rem;
    
`
const InputDiv = styled.div`
    & + & {
        margin-top : 1.5rem;
    }
    width : 13rem:
    margin : 1rem;
    display : flex;
`;

const InputLabel = styled.label`
    font-size : 1.1rem;
    margin-left : 2rem;
    border-radius : 1px solid black;
`;

const InputNumber = styled.input`
    background-color : #F2F8F9;
    width : 55%;
    margin-left : 3%;
    border : 1px solid black;
    text-align:right;
`;

const MidBtn = styled.button`
    & + & {
        margin-left : 0.5rem;
    }
    width : 13%;
    height : 75%;
    background-color : #D7FAFF;
    border-radius : 10px;
    font-size : 1.2rem;
    &:hover {
        background: #8DDEE9;
    }
`

const BottomBottomDiv = styled.div`
    display : flex;
    width : 100%;
`;

const BottomBottomLeftDiv = styled.div`
    width : 70%;
`;

const BottomBottomRightDiv = styled.div`
    width : 30%;
    text-align:center;
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

const Input = styled.input`
    margin-left : 0.6rem;
    margin-right : 0.5rem;
    margin-top : -0.1rem;
    height : 1.5rem;
    width : 1.5rem;
    & + & {
        margin-left : 1.4rem;
    }
`
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
}

const CashPay = memo(({orderId, payedPrice, all, notTotalPrice, totalPrice, setpayPrice, setClick, setDisplay, setAllprice}) => {

    const [totalprice,setTotalprice]=useState(totalPrice); //받을 금액
    const [price, setPrice]=useState(0); //받은 금액
    const [backPrice, setBackPrice]=useState(0); //거스름 돈

    const [pay,setPay]=useState(false);//결제 완료

    //부모 컴포넌트의 
    const setpayprice = (i) =>{
        console.log('i='+i);
        setpayPrice(i);
    }

    const wonBtn = (i) =>{
        console.log(payedPrice);
        setPrice(+price+i);
        { setAllprice ? setpayprice(+payedPrice):setpayprice(+price+i)} //복합 결제 시 받을 금액 기존 금액에 +
        console.log('price='+(+price+i));
    }

    useEffect(()=>{
        console.log('값 바뀜');
        setPrice(+payedPrice);
    },[payedPrice]);

    useEffect(()=>{
        console.log('가격 설정',price);
        price && price>totalPrice && setBackPrice(price-totalPrice);
    },[price]);


    const getPaid = async ()=>{
        const managerId = window.localStorage.getItem('managerId');
        console.log(managerId);

        //직원 ID.
        const data = JSON.stringify({
            orderId : orderId,
            employeeId : 1,
            branchId: managerId,
            payTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            method : '현금',
            finalPrice : totalPrice,
        });

        await axios.post('http://localhost:8080/payment/makePayment',data, {
            headers : {
            "Content-Type" : "application/json",
        }}).then(async (res)=>{
            console.log(res.data);
            const data2 = JSON.stringify({
                paymentId: res.data,
                branchId : managerId
            
            });
            console.log(data2);
            await axios.post('http://localhost:8080/payment/sendToCompany',data2, {
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                {setAllprice && setAllprice(all-totalPrice);}
                {notTotalPrice && notTotalPrice(all-totalprice);}
                setTotalprice(0);
                setPrice(0);
                setBackPrice(0);
                console.log(res,res.data);
                alert('현금결제가 완료되었습니다');
                setPay(true);//결제 완료
                alert("현금 영수증을 발급받으실 수 있습니다");
            }).catch(e=>{
                console.log(e);
                alert('결제가 실패하였습니다');
            })
        }).catch(e=>{
            console.log(e);
            alert('결제가 실패하였습니다');
        })
        
    }

    const getPay=async()=>{
        if(price>=totalprice && !notTotalPrice) getPaid();
        else if(price>=totalprice) {
            //복합결제
            //totalprice
            const managerId = window.localStorage.getItem('managerId');
            const data = JSON.stringify(
                {
                    payTime:new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
                    method : '현금',
                    price : totalprice,
                    branchId : managerId
                }
            );
            console.log(data);
            await axios.post('http://localhost:8080/payment/combinePay',data, {
            headers : {
            "Content-Type" : "application/json",
            }}).then((res)=>{
                {setAllprice && setAllprice(all-totalPrice);}
                {notTotalPrice && notTotalPrice(all-totalprice);}
                setTotalprice(0);
                setPrice(0);
                setBackPrice(0);
                console.log(res,res.data);
                alert('현금결제가 완료되었습니다');
            }).catch(e=>{
                console.log(e);
                alert('결제가 실패하였습니다');
            })
        }
        else if(price===0 || totalprice===0 || price<totalprice) alert('금액이 부족합니다!');
    }

    const [cardNum,setCardNum]=useState();
    const [checkCard, setCheckCard]=useState(false);
    const [apNum,setApnum]=useState();
    const [checkApprove,setCheckApprove]=useState(false);
    const [checkMan,setCheckMan]=useState(false);

    const doOpenCheck=(index)=>{
        setCheckMan(true);
        console.log(index);
        const obj = document.getElementsByName("check");
        for(let i=0; i<obj.length; i++){
            if(i === index){
                obj[i].checked = true;
            }
            else obj[i].checked=false;
        }
    }
    
    const onClickBtn = (e) =>{
        e.preventDefault();
        {
            !checkCard && alert('카드번호를 입력받습니다');
            setTimeout(() => {
                setCheckCard(true);
                const num = generateRandomCode(16);
                num.replace('0','1');
                setCardNum(+num);
                const rand = Math.floor(Math.random()*2);
                doOpenCheck(rand);
            }, 1000);
        }
        {
            checkCard && alert('이미 카드번호를 입력받았습니다')
        };
    };

    useEffect(()=>{
        console.log(checkCard, cardNum, apNum, checkApprove, checkMan);
        checkCard && cardNum && apNum && checkApprove && checkMan && alert('영수증이 출력되었습니다');

    },[checkApprove])

    return (
        <>
            <Templet>
                <Header>&nbsp;현금 결제
                    <ExitBtn onClick={()=>{
                        setDisplay && setDisplay(0);
                        !setDisplay && setClick(0)
                    }}>X</ExitBtn>
                </Header>
                <Center>
                    <Content>
                        <TopContent>
                            <TopLeft>
                                <TopLeftWrapper>
                                <h3>+ 받을 금액</h3>
                                <CostDiv>{totalprice}</CostDiv>
                                </TopLeftWrapper>
                                <TopLeftWrapper>
                                <h3>+ <span style={{color:'red'}}>받은 </span>금액</h3>
                                <CostDiv><span style={{color:'red'}}>{price}</span></CostDiv>
                                </TopLeftWrapper>
                                <TopLeftWrapper>
                                <h3>+ <span style={{color:'red'}}>거스름 돈</span></h3>
                                <CostDiv>{backPrice}</CostDiv>
                                </TopLeftWrapper>
                            </TopLeft>
                            <TopRightBtn onClick={getPay}>현금 결제<br/>완료</TopRightBtn>
                        </TopContent>

                        <MidContent>
                            <MidBtn onClick={()=>wonBtn(1000)}>천 원</MidBtn>
                            <MidBtn onClick={()=>wonBtn(5000)}>오천원</MidBtn>
                            <MidBtn onClick={()=>wonBtn(10000)}>만 원</MidBtn>
                            <MidBtn onClick={()=>wonBtn(50000)}>오만원</MidBtn>
                            <MidBtn onClick={()=>wonBtn(100000)}>십만원</MidBtn>
                        </MidContent>

                        <BottomContent>
                            <BottomInContent>
                                <h2>+ 현금 영수증</h2>
                                <BottomBottomDiv>
                                    <BottomBottomLeftDiv>
                                        <InputDiv>
                                            <InputLabel>카드 번호</InputLabel>
                                            <InputNumber value={cardNum} disabled></InputNumber>
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>사업 구분</InputLabel>
                                            <Input name="check" type="checkbox" value="개인" disabled/>개인
                                            <Input name="check" type="checkbox" value="사업자"  disabled/>사업자
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>승인 번호</InputLabel>
                                            <InputNumber value={apNum} disabled></InputNumber>
                                        </InputDiv>
                                    </BottomBottomLeftDiv>
                                    <BottomBottomRightDiv>
                                        <BottomRightBtn onClick={onClickBtn} style={{backgroundColor:'#474D4E', color:'white'}}>입력 요청</BottomRightBtn>
                                        <BottomRightBtn onClick={()=>{setApnum(new Date().getTime());setCheckApprove(true)}} style={{backgroundColor:'#D7FAFF', color:'black'}}>승인 요청</BottomRightBtn>
                                    </BottomBottomRightDiv>
                                    
                                </BottomBottomDiv>
                                {pay &&<BottomRightBtn onClick={()=>{
                                    alert("결제가 완료되어 좌석 화면으로 이동합니다");
                                    window.location.replace("/CurrentSeatInfo"
                                )}} style={{marginTop:'6%', marginLeft:'87%', width:'25%', height:'15%',backgroundColor:'#505D5E', color:'white'}}>나가기</BottomRightBtn>}
                            </BottomInContent>
                        </BottomContent>
                    </Content>
                </Center>

            </Templet>
        </>
    )
});

export default CashPay;
