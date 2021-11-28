import React,{useState,useEffect} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import DateButton from '../../../Components/Button/DateButton';
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import CircleChart from './CircleChart';
import axios from 'axios';

const Div = styled.div`
    display : flex;
`;

const LeftDiv = styled.div`
    width : 65%;
`;

const RightDiv = styled.div`
    width : 35%;
`;

const LeftTopDiv=styled.div`
    display : flex;
    margin : 1rem;
`;

const LeftBottomDiv=styled.div`
    height : 30vh;
`;

const RightTopDiv=styled.div`
    height : 35vh;
    border : 1px solid black;
    border-radius : 10px;
    margin : 1.5rem;
`;

const RightBottomDiv=styled.div`
    height : 47vh;
    border : 1px solid black;
    border-radius : 10px;
    margin : 1.5rem;
`;

const Title=styled.div`
    margin : 1rem;
    font-size : 2rem;
    font-weight : bold;
`;

const LeftTitle=styled.div`
    margin-left : 2rem;
    font-size : 1.5rem;
`;

const Selector = styled.select`
    height : 2.4rem;
    width : 5rem;
    background-color : #F2F0F0;
    font-size : 1rem;
    border-radius : 4px;
    line-height : 2rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-left : 0.5rem;
`;

const LeftBotBotDiv = styled.div`
    border-radius : 10px;
    border : 1px solid black;
    margin: 1%;
    height : 70vh;
`;

const Criteria = styled.div`
    width : 100%;
    height : 4vh;
`

const GraphTemp=styled.div`
    display : flex;
    width : 100%;
`
const GraphLeft = styled.div`
    width : 45%;
    height : 66vh;
`

const GraphRight = styled.div`
    width : 50%;
    height : 66vh;
`

const GraphDiv = styled.div`
    display : flex;
    justifyContent : center;
    width : 100%;
    height : 100%;
    align-items : center;
    margin-left : 10%;
`;

const TextDiv = styled.div`
    height : 2rem;
    font-size : 1rem;
    line-height : 2.5rem;
    margin-right : 0.5rem;
    font-weight : bold;
`;

const TableStyle = styled.table`
    width: 80%;
    margin : 0 auto;
    margin-top : 5%;
    max-height : 5rem;
`;

const OrderCell = styled.td`
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

const OrderRow = styled.tr`
    background-color: ${props => props.checked ? '#E4E6E7': '#F2F8F9'};
    &:focus {
        background: #FF0000;
    }
`;

const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 20px;
    text-align: center;
`;

const Cell=styled.td`
    font-size: 20px;
    text-align: center;
`

const MenuSalesTemplate = () => {

    const [category,setCategory]=useState('전체');
    const [select,setSelect]=useState(0);

    //월별->연도,월 선택
    const [year,setYear]=useState();
    const [month,setMonth]=useState();

    //요일별->요일 선택
    const [day,setDay]=useState();

    //통계
    const [stats,setStats]=useState([]); //기본
    const [sales,setSales]=useState([]); //매출 정렬
    const [popular,setPopular]=useState([]); //판매량 정렬
    const [sum,setSum]=useState(0); //비율을 구하기 위한 판매량의 합
    const [sumSale,setSumSale]=useState(0); //매출의 합
    const [graphData,setgraphData]=useState([]); //그래프에 들어갈 데이터

    useEffect(()=>{
        setSales(stats.concat([]).sort((a,b)=>{return b.price-a.price}));
        setPopular(stats.concat([]).sort((a,b)=>{return b.orderQuantity-a.orderQuantity}));
        setSum(stats.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.orderQuantity)
            ,0
        ));
        setSumSale(stats.reduce(
            (accumulator, currentValue) => accumulator + (+currentValue.price)
            ,0
        ));
    },[stats]);

    //그래프에 들어갈 데이터(매출순 정렬 data=>뽑아내기) menuName->name, price->value
    useEffect(()=>{
        const arr=[];
        setgraphData(sales.map((v,i)=>i<11&&
            arr.push({
                name:v.menuName,
                value:+v.price
            })
        ));
        console.log('arr',arr);
        setgraphData(arr);

    },[sales]);

    useEffect(()=>{
        setStats([]);
        setSales([]);
        setPopular([]);
        setSum(0);
        setSumSale(0);
        setgraphData([]);
    },[select]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async ()=>{
        const date = new Date();
        const today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        const managerId = window.localStorage.getItem('managerId');
        console.log(today);
        if(category=='' || category==undefined) setStats([]);
        if(category!==''){
            let categ=category;
            if(category==='전체') categ=undefined;

            if(select===0){//전체
                const data={
                    branchId : managerId,
                    stDate : '2021-11-01',
                    enDate : today,
                    menuCategory : categ
                }
                console.log(data);
                await axios.post('http://localhost:8080/menuStatistic/getAll',data,{
                headers : {
                "Content-Type" : "application/json",
            }}).then((res)=>{
                console.log(res.data);
                setStats(res.data);
            }).catch(e=>{
                console.log(e);
            })
            }
            else if(select===1 && year!=='' && year!==undefined && month!=='' && month!==undefined){//월별
                let changeMonth=month;
                if(month.length===1) changeMonth='0'+changeMonth;
                const date=year+'-'+changeMonth+'-';
                console.log(date);
                let lastD='30';
                if(month==1||month==3||month==5||month==7||month==8||month==10||month==12) lastD='31';
                else if(month==2) lastD='28';
                const data={
                    branchId : managerId,
                    stDate : date+'01',
                    enDate : date+lastD,
                    menuCategory : categ
                }
                console.log(data);
                await axios.post('http://localhost:8080/menuStatistic/getAll',data,{
                headers : {
                "Content-Type" : "application/json",
            }}).then((res)=>{
                console.log(res.data);
                setStats(res.data);
            }).catch(e=>{
                console.log(e);
            })
            }
            else if(select===2 && day!=='' && day!==undefined){//요일별
                console.log(day);
                let dayNum;
                if(day==='일요일') dayNum=1;
                else if(day==='월요일') dayNum=2;
                else if(day==='화요일') dayNum=3;
                else if(day==='수요일') dayNum=4;
                else if(day==='목요일') dayNum=5;
                else if(day==='금요일') dayNum=6;
                else if(day==='토요일') dayNum=7;
                console.log(day,dayNum);
                const data={
                    branchId : managerId,
                    day:dayNum,
                    menuCategory:categ
                }
                console.log(data);
                await axios.post('http://localhost:8080/menuStatistic/getByDay',data,{
                headers : {
                "Content-Type" : "application/json",
                }}).then((res)=>{
                console.log(res.data);
                setStats(res.data);
                }).catch(e=>{
                console.log(e);
            })
            }
            
        }
    },[category, select, year, month, day])

    return (
        <>
        <Header text ={"메뉴 통계"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <LeftDiv>
                <LeftTopDiv>
                    <DateButton onClick={()=>setSelect(0)} name={'전체'}/>
                    <DateButton onClick={()=>setSelect(1)} name={'월별'}/>
                    <DateButton onClick={()=>setSelect(2)} name={'요일별'}/>
                </LeftTopDiv>
                <LeftBottomDiv>
                <Div>
                    <LeftTitle>카테고리 : </LeftTitle>
                    <Selector style={{width : '8.4rem'}} onChange={(e)=>{e.preventDefault(); setCategory(e.target.value)}}>
                                <option value="전체">전체</option>
                                <option value="세트메뉴">세트메뉴</option>
                                <option value="2~3인분메뉴">2-3인분메뉴</option>
                                <option value="식사메뉴">식사메뉴</option>
                                <option value="사이드메뉴">사이드메뉴</option>
                                <option value="후식메뉴">후식메뉴</option>
                                <option value="추가메뉴">추가메뉴</option>
                                <option value="주류/음료">주류/음료</option>
                    </Selector>
                </Div>
                <LeftBotBotDiv>
                    <Criteria>
                        <div style={{display : 'flex', marginLeft:'-12.5%', marginTop:'1%', flexDirection : 'row', justifyContent:'center'}}>
                            {(select===1) && (
                                <>
                                <Selector value={year} onChange={(e)=>{setYear(e.target.value)}} style={{marginTop:'0.2%',width:'4.9rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                </Selector>
                                <TextDiv>년</TextDiv>
                                <Selector value={month} onChange={(e)=>{setMonth(e.target.value)}} style={{marginTop:'0.2%', width:'4.2rem', height : '2rem'}}>
                                    <option value="">-------</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </Selector>
                                <TextDiv>월</TextDiv>
                                </>
                            )}
                            {(select===2) && (
                                <>
                                <Selector value={day} onChange={(e)=>{setDay(e.target.value)}} style={{marginTop:'0.2%',width:'5.9rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value="월요일">월요일</option>
                                    <option value="화요일">화요일</option>
                                    <option value="수요일">수요일</option>
                                    <option value="목요일">목요일</option>
                                    <option value="금요일">금요일</option>
                                    <option value="토요일">토요일</option>
                                    <option value="일요일">일요일</option>
                                </Selector>
                                </>
                            )}
                        </div>                
                    </Criteria>

                    <GraphTemp>
                        <GraphLeft>
                        <Title style={{marginLeft:'15%', marginTop:'-%'}}>
                            {(select===0) &&  '전체 통계'}
                            {(select===1) &&  '월별 통계'}
                            {(select===2) &&  '요일별 통계'}
                        </Title>
                            <TableContainer style={{marginLeft:'5%',marginTop :'-3%',height : '70%',overflow: 'hidden',}}>
                                <TableStyle style={{overflow:'auto', width:'100%'}}>
                                    <TableHead style={{height : '4vh'}}>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell>매출(원)</ColumnCell>
                                            <ColumnCell style={{width:'17%'}}>비율(%)</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    {sales.length>0 && sales.map((cell, index) => (
                                        index<11 &&
                                        <OrderRow style={{height : '3.8vh'}}>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.menuName}</OrderCell>
                                            <OrderCell>{Number(cell.price).toLocaleString()}</OrderCell>
                                            <OrderCell>{(cell.price/sumSale*100).toFixed(1)} </OrderCell>
                                        </OrderRow>
                                    ))}
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>

                            <div style={{marginTop:'1%',display : 'flex', flexDirection : 'row', justifyContent:'center'}}>
                            <TableContainer margin='10px' style={{width : '60%', height : '55%',overflow: 'hidden',}}>
                                <TableStyle style={{width:'90%'}}>
                                    <TableHead>
                                        <OrderRow style={{height : '4.3vh'}}>
                                            <ColumnCell style={{width:'45%'}}>총 매출(원)</ColumnCell>
                                            <Cell style={{width:'55%'}}>{sumSale.toLocaleString()}</Cell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                            </div>
                        </GraphLeft>
                        <GraphRight>
                            <GraphDiv>
                                <CircleChart legend={3} chartData={graphData} width={800} height={800} cx={300} cy={370} r={200}/>
                            </GraphDiv>
                        </GraphRight>
                    </GraphTemp>
                </LeftBotBotDiv>
                </LeftBottomDiv>
                
            </LeftDiv>
            <RightDiv>
                <RightTopDiv>
                    <Title>인기도(TOP 3)</Title>
                    <TableContainer style={{width : '100%', height : '87%', overflow: 'hidden', marginTop:'-2%'}}>
                                <TableStyle style={{width : '90%'}}>
                                    <TableHead style={{height : '5vh'}}>
                                        <OrderRow>
                                            <ColumnCell style={{fontSize:'1.3rem', width : '15%'}}>NO</ColumnCell>
                                            <ColumnCell style={{fontSize:'1.3rem'}}>메뉴</ColumnCell>
                                            <ColumnCell style={{fontSize:'1.3rem', width:'20%'}}>판매량</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    {popular.length>0 && popular.map((cell, index) => (
                                        index<3 &&
                                        <OrderRow style={{height : '5vh'}}>
                                            <OrderCell style={{fontSize:'1.3rem'}} component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell style={{fontSize:'1.3rem'}}>{cell.menuName}</OrderCell>
                                            <OrderCell style={{fontSize:'1.3rem'}}>{cell.orderQuantity}</OrderCell>
                                        </OrderRow>
                                    ))}
                                    </TableBody>
                                </TableStyle>                
                    </TableContainer>
                </RightTopDiv>
                <RightBottomDiv>
                    <Title>판매현황</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-5%'}}>
                                <TableStyle style={{width : '90%'}}>
                                    <TableHead style={{height:'4vh'}}>
                                        <OrderRow>
                                            <ColumnCell style={{width:'15%'}}>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell style={{width:'20%'}}>판매량</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    {popular.length>0 && popular.map((cell, index) => (
                                        index<11 && 
                                        <OrderRow>
                                            <OrderCell component="th" scope="cell">{index+1}</OrderCell>
                                            <OrderCell>{cell.menuName}</OrderCell>
                                            <OrderCell>{cell.orderQuantity}</OrderCell>
                                        </OrderRow>
                                    ))}
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                </RightBottomDiv>
            </RightDiv>
        </Div>
        </>
    );
};

export default MenuSalesTemplate