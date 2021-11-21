import React,{useState} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import DateButton from '../../../Components/Button/DateButton';
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import LChart from './LineChart';
import SaleInfoItem from '../../../Components/Box/SaleInfoItem';

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
    height : 35vh;
`;

const RightTopDiv=styled.div`
    height : 40.7vh;
    border : 1px solid black;
    border-radius : 10px;
    margin : 1.5rem;
`;

const RightBottomDiv=styled.div`
    height : 40.7vh;
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
    height : 75vh;
`;

const Criteria = styled.div`
    width : 100%;
    height : 4vh;
    margin-top : 1%;
`

const GraphTemp=styled.div`

`
const GraphTop = styled.div`
    width : 100%;
    height : 30vh;
    margin-top: 0.3rem;
    border : 1px solid blue;
`

const GraphBottom = styled.div`
    width : 100%;
    margin-top: 0.3rem;
    border : 1px solid green;
`

const GraphDiv = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100%;
    height : 100%;
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

const SaleDiv = styled.div`
    display : flex;
    flex-direction : row;
`;

const SaleInfoDiv = styled.div`
    width : 100%;
    height : 10vh;
`;

const SalesTemplate = () => {

    const [category,setCategory]=useState('');
    const [select,setSelect]=useState(0);

    const [year,setYear]=useState();

    const [month,setMonth]=useState();

    const [weekmonth,setWeekmonth]=useState();
    const [week,setWeek]=useState();

    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();

    return (
        <>
        <Header text ={"매상 통계"} restaurantName = {localStorage.getItem('storeName')}/>
        <Div>
            <LeftDiv>
                <LeftTopDiv>
                    <DateButton onClick={()=>setSelect(0)} name={'오늘요약'}/>
                    <DateButton onClick={()=>setSelect(1)} name={'월별'}/>
                    <DateButton onClick={()=>setSelect(2)} name={'주별'}/>
                    <DateButton onClick={()=>setSelect(3)} name={'요일별'}/>
                    <DateButton  onClick={()=>setSelect(4)} name={'직접입력'}/>
                </LeftTopDiv>
                <LeftBotBotDiv>
                    <Criteria>
                        <div style={{display : 'flex', flexDirection : 'row', justifyContent:'center'}}>
                           
                            {(select===1) && (
                                <>
                                <Selector value={year} onChange={''} style={{marginTop:'0.2%',width:'4.6rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value="2021">2021</option>
                                </Selector>
                                <TextDiv>년</TextDiv>
                                </>
                            )}
                            {(select===2) && (
                                <>
                                <Selector value={month} onChange={''} style={{marginTop:'0.2%',width:'4rem', height :'2rem'}}>
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
                                    <option value="11">12</option>
                                    <option value="12">12</option>
                                </Selector>
                                <TextDiv>월</TextDiv>
                                </>
                            )}
                            {(select===3) && (
                                <>
                                <Selector value={weekmonth} onChange={''} style={{marginTop:'0.2%',width:'4rem', height :'2rem'}}>
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
                                    <option value="11">12</option>
                                    <option value="12">12</option>
                                </Selector>
                                <TextDiv>월</TextDiv>
                                <Selector value={week} onChange={''} style={{marginTop:'0.2%', width:'3.5rem', height : '2rem'}}>
                                    <option value="">-------</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Selector>
                                <TextDiv>주</TextDiv>
                                </>
                            )}
                            {(select===4) && (
                                <>
                                <br/>
                                <div style={{ display:'flex'}}>
                                <input type="date" value={startDate}/>
                                <TextDiv style={{marginLeft:'0.5rem', marginBottom:'0.5rem'}}> ~ </TextDiv>
                                <input type="date" value={endDate}/>
                                </div>
                                </>
                            )}
                        </div>                
                    </Criteria>

                    <GraphTemp>
                        <GraphTop>
                        {(select===0) && (
                            <>
                            <SaleDiv>
                                <SaleInfoItem price={0} colors={"#8DDEE9"} criterion ={"오늘"} count ={0}/>
                                <SaleInfoItem price={0} colors={"orange"} criterion ={"주간"} count ={0}/>
                                <SaleInfoItem price={0} colors={"blue"} criterion ={"월간"} count ={0}/>
                                <SaleInfoItem price={"22,301,300"} colors={"purple"} criterion ={"올해"} count ={"1,000,000"}/>

                            </SaleDiv>
                           </>
                           )}
                            {(select===1) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>월</ColumnCell>
                                            <ColumnCell>1</ColumnCell>
                                            <ColumnCell>2</ColumnCell>
                                            <ColumnCell>3</ColumnCell>
                                            <ColumnCell>4</ColumnCell>
                                            <ColumnCell>5</ColumnCell>
                                            <ColumnCell>6</ColumnCell>
                                            <ColumnCell>7</ColumnCell>
                                            <ColumnCell>8</ColumnCell>
                                            <ColumnCell>9</ColumnCell>
                                            <ColumnCell>10</ColumnCell>
                                            <ColumnCell>11</ColumnCell>
                                            <ColumnCell>12</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                           {(select===2) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>주</ColumnCell>
                                            <ColumnCell>1</ColumnCell>
                                            <ColumnCell>2</ColumnCell>
                                            <ColumnCell>3</ColumnCell>
                                            <ColumnCell>4</ColumnCell>
                                            <ColumnCell>5</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                           {(select===3) && (
                            <>
                            <TableContainer margin='10px' style={{marginTop : '-3%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>요일</ColumnCell>
                                            <ColumnCell>월</ColumnCell>
                                            <ColumnCell>화</ColumnCell>
                                            <ColumnCell>수</ColumnCell>
                                            <ColumnCell>목</ColumnCell>
                                            <ColumnCell>금</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                           </>
                           )}
                        </GraphTop>
                        
                        {(select!==4) &&
                            <>
                            <GraphBottom>
                                <GraphDiv>
                                    <LChart/>
                                </GraphDiv>
                            </GraphBottom>
                            </>
                        }
                        {select===5 &&
                            <>
                            <RightTopDiv style={{height : '100%', border:'none'}}>
                            <Title>기간 누적매출</Title>
                            <TableContainer  margin='10px' style={{height : '50%', overflow: 'hidden', marginTop:'-4%'}}>
                                        <TableStyle>
                                            <TableHead>
                                                <OrderRow>
                                                    <ColumnCell> 기간 총 매출</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell> 부가세</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                                <OrderRow>
                                                    <ColumnCell> 기간 순 매출</ColumnCell>
                                                    <Cell>12345</Cell>
                                                </OrderRow>
                                            </TableHead>
                                            <TableBody>

                                            </TableBody>
                                        </TableStyle>                
                            </TableContainer>
                            </RightTopDiv>
                            </>
                        }
                    </GraphTemp>
                </LeftBotBotDiv>
                
            </LeftDiv>
            <RightDiv>
                {select!==4 && (<>
                <RightTopDiv>
                    <Title>기간 누적매출</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell> 기간 총 매출</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                        <OrderRow>
                                            <ColumnCell> 부가세</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                        <OrderRow>
                                            <ColumnCell> 기간 순 매출</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                    </TableContainer>
                </RightTopDiv>
                </>
                )}
                {select===4 && (<div style={{height:'25%'}}/>)}
                <RightBottomDiv>
                    <Title>전체 매출</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                    <OrderRow>
                                            <ColumnCell> 총 매출</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                        <OrderRow>
                                            <ColumnCell> 부가세</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                        <OrderRow>
                                            <ColumnCell> 순 매출</ColumnCell>
                                            <Cell>12345</Cell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                </RightBottomDiv>
            </RightDiv>
        </Div>
        </>
    );
};

export default SalesTemplate