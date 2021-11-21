import React,{useState} from 'react';
import Header from '../../../Components/Header';
import styled from 'styled-components';
import DateButton from '../../../Components/Button/DateButton';
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import CircleChart from './CircleChart';

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
    height : 70vh;
`;

const Criteria = styled.div`
    width : 100%;
    height : 4vh;
`

const GraphTemp=styled.div`
    display : flex;

`
const GraphLeft = styled.div`
    width : 50%;
    height : 66vh;
    border : 1px solid blue;
`

const GraphRight = styled.div`
    width : 50%;
    height : 66vh;
    border : 1px solid green;
`

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

const MenuSalesTemplate = () => {

    const [category,setCategory]=useState('');
    const [select,setSelect]=useState(0);

    const [year,setYear]=useState();
    const [month,setMonth]=useState();
    const [day,setDay]=useState();

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
                    <Selector value={category} onChange={''}>
                                <option value="">------</option>
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
                        <div style={{display : 'flex', flexDirection : 'row', justifyContent:'center'}}>
                            {(select===1) && (
                                <>
                                <Selector value={year} onChange={''} style={{marginTop:'0.2%',width:'4.6rem', height :'2rem'}}>
                                    <option value="">-------</option>
                                    <option value="2021">2021</option>
                                </Selector>
                                <TextDiv>년</TextDiv>
                                <Selector value={month} onChange={''} style={{marginTop:'0.2%', width:'3.5rem', height : '2rem'}}>
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
                                <Selector value={day} onChange={''} style={{marginTop:'0.2%',width:'5.4rem', height :'2rem'}}>
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
                            <TableContainer margin='10px' style={{height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell>매출</ColumnCell>
                                            <ColumnCell>비율</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>

                            <div style={{display : 'flex', flexDirection : 'row', justifyContent:'center'}}>
                            <TableContainer margin='10px' style={{width : '50%', height : '85%',overflow: 'hidden',}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>총 매출</ColumnCell>
                                            <Cell>1000</Cell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>
                                    </TableBody>
                                </TableStyle>                
                            </TableContainer>
                            </div>
                        </GraphLeft>
                        <GraphRight>
                            <CircleChart/>
                        </GraphRight>
                    </GraphTemp>
                </LeftBotBotDiv>
                </LeftBottomDiv>
                
            </LeftDiv>
            <RightDiv>
                <RightTopDiv>
                    <Title>인기도(TOP 3)</Title>
                    <TableContainer  margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell>판매량</ColumnCell>
                                        </OrderRow>
                                    </TableHead>
                                    <TableBody>

                                    </TableBody>
                                </TableStyle>                
                    </TableContainer>
                </RightTopDiv>
                <RightBottomDiv>
                    <Title>판매현황</Title>
                    <TableContainer margin='10px' style={{height : '87%', overflow: 'hidden', marginTop:'-4%'}}>
                                <TableStyle>
                                    <TableHead>
                                        <OrderRow>
                                            <ColumnCell>NO</ColumnCell>
                                            <ColumnCell>메뉴</ColumnCell>
                                            <ColumnCell>판매량</ColumnCell>
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

export default MenuSalesTemplate