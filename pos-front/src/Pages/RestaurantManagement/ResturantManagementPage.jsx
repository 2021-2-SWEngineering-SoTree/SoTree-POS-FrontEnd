import React, {useState, useEffect,useRef} from 'react';
import styled from 'styled-components';
import SoTree_Main_Logo from '../../Assets/SoTree_Vector_Logo.svg';
import { Route, Link, Routes } from 'react-router-dom';
import MenuTemplate from './MenuManagement/MenuTemplate';
import SeatTemplate from './SeatManangement/SeatTemplate';
import StockTemplate from './StockManagement/StockTemplate';
import EventTemplate from './EventManagement/EventTemplate';
import { SmallModal } from '../../Components/Modal';
import axios from 'axios';
import Header from '../../Components/Header';


const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height : 680px;
`;
const LeftDiv = styled.div`
    width : 100%;
    height : 100%;
    flex-grow : 1;
`;
const LogoDiv = styled.div`
    min-width : 600px;
    height : 300px;
    line-height : 300px;
    vertical-align : middle;
    text-align: center;
    margin-top : 200px;
    align-items : center;
`;

const RightDiv = styled.div`
    width : 60%;
    margin : 0 auto;
    align-items: center
`;

const InnerRightDiv = styled.div`
    vertical-align : middle;
    text-align: center;
    margin-top : 18vh;
    align-items : center;
`;

const LogoImg = styled.img`
    width : 700px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const Button = styled.button`
    top:50%;
    width : 25rem;
    height : 4.5rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin-bottom : 2.5rem;
    
`;

const Title = styled.h1`
    text-align:center;
`;

const Text = styled.h2`
    margin-top : 5%;
    text-align : center;
`;

const Form = styled.div`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;
const WrapperDiv = styled.div`
    & + & {
        margin-top : 1vh;
    }
    justify-content : center;
    margin-bottom : 1vh;
    display : flex;
    flex-direction : column;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
`;

const Input = styled.input`
    height : 4rem;
    background-color : #F2F0F0;
    font-size : 1.5vw;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const RestaurantManagementPage = () => {

    const [visible, setVisible]=useState(false);
    const [seatNumber, setSeatNumber] = useState(0);

    const didMountRef = useRef();
    const numRef = useRef();

    const [errorMessage, setErrorMessage] = useState("");

    const finishClick = ()=>{
        setVisible(true);
    }

    const validateNum = num =>{
        const reg = /^[0-9]{1,2}/;
        return reg.test(num);
    }

    const managerId = window.localStorage.getItem('managerId');
    
    useEffect(async ()=>{
        
        await axios.post('http://localhost:8080/getSeatCnt',managerId,{
        headers : {
        "Content-Type" : "application/json",
    }}).then((res)=>{
        console.log(res.data);
        setSeatNumber(res.data);
    }).catch(e=>{
        console.log(e);
    })

    },[])

    useEffect(()=>{
        let _errorMessage = "";
        if(didMountRef.current){
            if(seatNumber<=0 || !validateNum(seatNumber) || seatNumber>=100){
                _errorMessage = "입력을 확인해주세요";
            }
            setErrorMessage(_errorMessage);
        }
        else{
            didMountRef.current = true;
        }
    },[seatNumber])

    const clicktoset = async() =>{

        const data={
            branchId : managerId,
            seatCnt : seatNumber
        }

        await axios.post('http://localhost:8080/updateSeatCnt',data,{
        headers : {
        "Content-Type" : "application/json",
    }}).then((res)=>{
        console.log(res.data);
        //setStats(res.data);
        
    }).catch(e=>{
        console.log(e);
    })
    }

    const onSubmitHandler = async(e) =>{
        if(errorMessage==""){
            const data={
                branchId : managerId,
                seatCnt : seatNumber
            }
    
            await axios.post('http://localhost:8080/updateSeatCnt',data,{
            headers : {
            "Content-Type" : "application/json",
        }}).then((res)=>{
            console.log(res.data);
            alert("좌석이 변경되었습니다!");
            window.localStorage.setItem('SeatSize',seatNumber);
            window.location.replace("/restaurantManagement")
            //setStats(res.data);
            
        }).catch(e=>{
            console.log(e);
        })
        } else {
            alert("입력을 확인해주세요!");
        }
    }

    return (
        <>
        <Header text ={"매장 관리"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>

        <SmallModal visible={visible}>
                    <Form onSubmit = {onSubmitHandler}>
                    <Title>좌석 설정</Title>
                    
                    <WrapperDiv>
                        <InputLable>테이블 개수</InputLable>
                        <div style={{display : 'flex', flexDirection : 'row', flexGrow: 1}}>
                            <Input type = "text" placeholder = {"아이디"} style={{flexGrow:3}}
                             value={seatNumber}
                             ref={numRef}
                             onChange={(e)=> {setSeatNumber(e.target.value.trim());}}
                             onKeyPress={(e)=> {/*if(e.key === 'Enter') pwdRef.current.focus();*/}}/>
                        </div>
                    </WrapperDiv>
                        <LeftDiv style={{display:'flex',marginTop:'23%', justifyContent:'flex-end'}}>
                        <Button style={{width:'7rem', height:'4rem'}} type = "submit" onClick={onSubmitHandler}>확인</Button>
                        <Button style={{marginLeft:'1.5rem',width:'7rem', height:'4rem'}} onClick={()=>{setVisible(false)}}>취소</Button>
                        </LeftDiv>
                        
                    </Form>
            </SmallModal>

            <LeftDiv>
                <LogoDiv>
                    <LogoImg src = {SoTree_Main_Logo} alt="Logo"/>
                </LogoDiv>
            </LeftDiv>
            <RightDiv>
                <InnerRightDiv>
                    <Link to = "/restaurantManagement/menu"><Button>메뉴 관리</Button></Link>
                    <Link to = "/restaurantManagement/stock"><Button>재고 관리</Button></Link>
                    <Link to = "/restaurantManagement/event"><Button>이벤트 관리</Button></Link>
                    <Button  onClick={finishClick}>좌석 관리</Button>
                </InnerRightDiv>
            </RightDiv>
            <Routes>
                <Route path="/restaurantManagement/menu" element={<MenuTemplate/>} />
                <Route path="/restaurantManagement/stock" element={<StockTemplate/>} />
                <Route path="/restaurantManagement/seat" element={<SeatTemplate/>} />  
            </Routes>
        </Div>
        </>
    );
};

export default RestaurantManagementPage;