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

const CashPay = memo(({eId, orderId, payedPrice, all, notTotalPrice, totalPrice, setpayPrice, setClick, setDisplay, setAllprice}) => {

    const [totalprice,setTotalprice]=useState(totalPrice); //?????? ??????
    const [price, setPrice]=useState(0); //?????? ??????
    const [backPrice, setBackPrice]=useState(0); //????????? ???

    const [pay,setPay]=useState(false);//?????? ??????
    const [pay2,setPay2]=useState(false);
    const [end,setEnd]=useState(false);

    //?????? ??????????????? 
    const setpayprice = (i) =>{
        console.log('i='+i);
        setpayPrice(i);
    }

    const wonBtn = (i) =>{
        console.log(payedPrice);
        setPrice(+price+i);
        { setAllprice ? setpayprice(+payedPrice):setpayprice(+price+i)} //?????? ?????? ??? ?????? ?????? ?????? ????????? +
        console.log('price='+(+price+i));
    }

    useEffect(()=>{
        console.log('??? ??????');
        setPrice(+payedPrice);
    },[payedPrice]);

    useEffect(()=>{
        console.log('?????? ??????',price);
        price && price>totalPrice && setBackPrice(price-totalPrice);
    },[price]);


    const getPaid = async ()=>{
        const managerId = window.localStorage.getItem('managerId');
        console.log(managerId);

        //?????? ID.
        const data = JSON.stringify({
            orderId : orderId,
            employeeId : eId,
            branchId: managerId,
            payTime : new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
            method : '??????',
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
                alert('??????????????? ?????????????????????');
                setPay(true);//?????? ??????
                setEnd(true);
                alert("?????? ???????????? ??????????????? ??? ????????????");
            }).catch(e=>{
                console.log(e);
                alert('????????? ?????????????????????');
            })
        }).catch(e=>{
            console.log(e);
            alert('????????? ?????????????????????');
        })
        
    }

    const getPay=async()=>{
        if(!end){
            let go=window.confirm('????????? ?????????????????????????');
            if(go){
            if(price>=totalprice && !notTotalPrice) getPaid();
            else if(price>=totalprice) {
                //????????????
                //totalprice
                const managerId = window.localStorage.getItem('managerId');
                const data = JSON.stringify(
                    {
                        payTime:new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16),
                        method : '??????',
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
                    setPay2(true);
                    setEnd(true);
                    alert('??????????????? ?????????????????????');
                }).catch(e=>{
                    console.log(e);
                    alert('????????? ?????????????????????');
                })
            }
            else if(price===0 || totalprice===0 || price<totalprice) alert('????????? ???????????????!');
        }
        }else alert("????????? ?????????????????????");
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
            !checkCard && alert('??????????????? ??????????????????');
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
            checkCard && alert('?????? ??????????????? ?????????????????????')
        };
    };

    useEffect(()=>{
        console.log(checkCard, cardNum, apNum, checkApprove, checkMan);
        checkCard && cardNum && apNum && checkApprove && checkMan && alert('???????????? ?????????????????????');

    },[checkApprove])

    return (
        <>
            <Templet>
                <Header>&nbsp;?????? ??????
                    <ExitBtn onClick={()=>{
                        (!pay&&!pay2) && alert("????????? ?????? ???????????? ???????????????");
                        (pay||pay2) && setDisplay && setDisplay(0);
                        (pay||pay2) && !setDisplay && setClick(0)
                    }}>X</ExitBtn>
                </Header>
                <Center>
                    <Content>
                        <TopContent>
                            <TopLeft>
                                <TopLeftWrapper>
                                <h3>+ ?????? ??????</h3>
                                <CostDiv>{totalprice}</CostDiv>
                                </TopLeftWrapper>
                                <TopLeftWrapper>
                                <h3>+ <span style={{color:'red'}}>?????? </span>??????</h3>
                                <CostDiv><span style={{color:'red'}}>{price}</span></CostDiv>
                                </TopLeftWrapper>
                                <TopLeftWrapper>
                                <h3>+ <span style={{color:'red'}}>????????? ???</span></h3>
                                <CostDiv>{backPrice}</CostDiv>
                                </TopLeftWrapper>
                            </TopLeft>
                            <TopRightBtn onClick={getPay}>?????? ??????<br/>??????</TopRightBtn>
                        </TopContent>

                        <MidContent>
                            <MidBtn onClick={()=>wonBtn(1000)}>??? ???</MidBtn>
                            <MidBtn onClick={()=>wonBtn(5000)}>?????????</MidBtn>
                            <MidBtn onClick={()=>wonBtn(10000)}>??? ???</MidBtn>
                            <MidBtn onClick={()=>wonBtn(50000)}>?????????</MidBtn>
                            <MidBtn onClick={()=>wonBtn(100000)}>?????????</MidBtn>
                        </MidContent>

                        <BottomContent>
                            <BottomInContent>
                                <h2>+ ?????? ?????????</h2>
                                <BottomBottomDiv>
                                    <BottomBottomLeftDiv>
                                        <InputDiv>
                                            <InputLabel>?????? ??????</InputLabel>
                                            <InputNumber value={cardNum} disabled></InputNumber>
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>?????? ??????</InputLabel>
                                            <Input name="check" type="checkbox" value="??????" disabled/>??????
                                            <Input name="check" type="checkbox" value="?????????"  disabled/>?????????
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>?????? ??????</InputLabel>
                                            <InputNumber value={apNum} disabled></InputNumber>
                                        </InputDiv>
                                    </BottomBottomLeftDiv>
                                    <BottomBottomRightDiv>
                                        <BottomRightBtn onClick={onClickBtn} style={{backgroundColor:'#474D4E', color:'white'}}>?????? ??????</BottomRightBtn>
                                        <BottomRightBtn onClick={()=>{setApnum(new Date().getTime());setCheckApprove(true)}} style={{backgroundColor:'#D7FAFF', color:'black'}}>?????? ??????</BottomRightBtn>
                                    </BottomBottomRightDiv>
                                    
                                </BottomBottomDiv>
                                {pay &&<BottomRightBtn onClick={()=>{
                                    alert("????????? ???????????? ?????? ???????????? ???????????????");
                                    window.location.replace("/CurrentSeatInfo"
                                )}} style={{marginTop:'6%', marginLeft:'87%', width:'25%', height:'15%',backgroundColor:'#505D5E', color:'white'}}>?????????</BottomRightBtn>}
                            </BottomInContent>
                        </BottomContent>
                    </Content>
                </Center>

            </Templet>
        </>
    )
});

export default CashPay;
