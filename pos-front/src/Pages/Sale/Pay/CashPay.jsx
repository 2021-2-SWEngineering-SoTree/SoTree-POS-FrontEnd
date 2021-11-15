import styled from 'styled-components';
import React, {useState, useEffect} from 'react';

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

function doOpenCheck(e){
    console.log(e);
    console.log(e.target);
    var obj = document.getElementsByName("check");
    console.log(obj[0],obj[1]);
    for(var i=0; i<obj.length; i++){
        if(obj[i] !== e.target){
            obj[i].checked = false;
        }
    }
}

const CashPay = ({totalPrice, setpayedPrice, setClick}) => {

    const [totalprice,setTotalprice]=useState(totalPrice);
    const [price, setPrice]=useState(0);
    const [backPrice, setBackPrice]=useState(totalPrice);

    const wonBtn = (i) =>{
        setPrice(price+i);
    }

    useEffect(()=>{
        console.log('가격 설정');
        price && setBackPrice(totalPrice-price);
    },[price]);

    const getPaid = async()=>{
        setTotalprice(0);
        setPrice(0);
        setBackPrice(0);
        alert('결제가 완료되었습니다');
    }

    const [cardNum,setCardNum]=useState();
    const [checkCard, setCheckCard]=useState(false);
    const [apNum,setApnum]=useState();
    const [checkApprove,setCheckApprove]=useState(false);

    const onClickBtn = () =>{setCheckCard(true);};

    const onChange = (e)=>{
        console.log(e.target.value);
        !checkCard && alert('먼저 입력 요청을 해주세요');
        checkCard && setCardNum(e.target.value);
    }

    useEffect(()=>{
        
        console.log(checkCard, cardNum, apNum, checkApprove);
        checkCard && cardNum && apNum && checkApprove && alert('영수증이 출력되었습니다');
    },[checkApprove])

    return (
        <>
            <Templet>
                <Header>&nbsp;현금 결제
                    <ExitBtn onClick={()=>setClick(0)}>X</ExitBtn>
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
                            <TopRightBtn onClick={getPaid}>현금 결제<br/>완료</TopRightBtn>
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
                                            <InputNumber placeholder={'16자리 '} onChange={onChange} value={cardNum}></InputNumber>
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>사업 구분</InputLabel>
                                            <Input name="check" type="checkbox" value="개인" onClick={doOpenCheck}/>개인
                                            <Input name="check" type="checkbox" value="사업자" onClick={doOpenCheck}/>사업자
                                        </InputDiv>
                                        <InputDiv>
                                            <InputLabel>승인 번호</InputLabel>
                                            <InputNumber value={apNum}></InputNumber>
                                        </InputDiv>
                                    </BottomBottomLeftDiv>
                                    <BottomBottomRightDiv>
                                        <BottomRightBtn onClick={onClickBtn} style={{backgroundColor:'#474D4E', color:'white'}}>입력 요청</BottomRightBtn>
                                        <BottomRightBtn onClick={()=>{setApnum(new Date().getTime());setCheckApprove(true)}} style={{backgroundColor:'#D7FAFF', color:'black'}}>승인 요청</BottomRightBtn>
                                    </BottomBottomRightDiv>
                                </BottomBottomDiv>
                            </BottomInContent>
                        </BottomContent>
                    </Content>
                </Center>

            </Templet>
        </>
    )
};

export default CashPay;