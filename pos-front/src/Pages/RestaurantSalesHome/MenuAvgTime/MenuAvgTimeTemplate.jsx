import React, {useEffect, useState} from 'react';
import Header from '../../../Components/Header';
import styled from "styled-components";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import axios from "axios";

const CategoryButton = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 4.3rem;
    width : 13.0%;
    margin : 0.1rem;
    text-align : center;
    font-size : 1.1rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`
const Div = styled.div`
    max-width: 1980px;
    padding: 20px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height: 680px;
`;

const ButtonDiv = styled.div`
    max-width: 1980px;
    flex-wrap: nowrap;
    display: flex;
    gap: 1em;
    height: 4.3rem;
`;

const LeftSideDiv = styled.div`
    margin: 0 auto;
    padding: 60px;
    width: 45%;
    float: left;
`;

const RightSideDiv = styled.div`
    margin: 0 auto;
    padding: 60px;
    width: 45%;
    float: right;
`;

const LargeTitle = styled.h2`
    font-size: 40px;
`;

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 25px;
    text-align: center;
`;

// td style
const AverageCell = styled.td`
    background-color: #FFFFFF;
    color: #000000;
    font-size: 20px;
    text-align: center;
`;

// tr style
const AverageRow = styled.tr`
    background-color: #FFFFFF;
    height : 4vh;
    &:focus {
        background-color : #FF0000;
    }
`;

const NotExistDataDiv = styled.div`
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 200px;
`;

// table style
const AverageTableStyle = styled.table`
    min-width: 580px;
    width: 100%;
`;

const createLeftRowData = (number, menu, avgTime) => {
    return [number, menu, avgTime];
}


const MenuAvgTimeTemplate = () => {

    const [leftCell, setLeftCell] = useState([]);
    const [rightCell, setRightCell] = useState([]);

    const leftColumnName = ['번호', '메뉴', '평균 준비 시간(분)'];
    const rightColumnName = ['요일', '점심타임(L)', '저녁타임(D)', '영업시간 전체(F)'];

    const [selectedCategory, setSelectedCategory] = useState("식사");

    const getMenuOfCategory = async () => {
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            branchId: managerId,
            category: selectedCategory,
        }
        try {
            // 데이터를 받아오는 동안 시간 소모. await 대기
            await axios.post('http://localhost:8080/menu/getMeanTimeByCategory', JSON.stringify(data), {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then((res) => {
                console.log(res.data);
                let leftCells = [ ];
                let i = 0;
                for(let key in res.data) {
                    i += 1;
                    let menu = "";
                    if(res.data[key] === -1) {
                        menu = "준비시간이 존재하지 않습니다."
                    }
                    else {
                        menu = res.data[key];
                    }
                    leftCells.push(
                        createLeftRowData(i, key, menu)
                    )
                }
                setLeftCell(leftCells);
                console.log(leftCells);
            })
        } catch (e) {
            console.error(e.message);
        }
    }

    const getCustomerAvgTime = async() => {
        let managerId = window.localStorage.getItem('managerId');
        try {
            // 데이터를 받아오는 동안 시간 소모. await 대기
            await axios.post('http://localhost:8080/payment/getCustomerAvgTime', managerId, {
                headers: {
                    "Content-Type": `application/json`,
                }
            }).then((res) => {
                console.log(res.data);
                const data = res.data;
                let rightCells = [
                    ['전체', -data['allDay'][0] !== undefined ? -data['allDay'][0].lunchAvg :0, -data['allDay'][0] !== undefined ? -data['allDay'][0].dinnerAvg:0, -data['allDay'][0] !== undefined ? data['allDay'][0].totalAvg :0],
                    ['평일', -data['weekday'][0] !== undefined ? -data['weekday'][0].lunchAvgWeekday :0,  -data['weekday'][0] !== undefined ?  -data['weekday'][0].dinnerAvgWeekday :0, -data['weekday'][0] !== undefined ? -data['weekday'][0].totalAvgWeekday :0],
                    ['주말', -data['weekend'][0] !== undefined  ? -data['weekend'][0].lunchAvgWeekend :0, -data['weekend'][0] !== undefined ? -data['weekend'][0].dinnerAvgWeekend :0, -data['weekend'][0] !== undefined ?  -data['weekend'][0].totalAvgWeekend :0],
                    ['일요일', -data['dayLunch'][6] !== undefined ?   -data['dayLunch'][6].timestampdiff:0, -data['dayDinner'][6] !== undefined ?  -data['dayDinner'][6].timestampdiff:0,   -data['dayAllTime'][6] !== undefined ? -data['dayAllTime'][6].timestampdiff :0],
                    ['월요일', -data['dayLunch'][1] !== undefined ?   -data['dayLunch'][1].timestampdiff:0, -data['dayDinner'][1] !== undefined ?  -data['dayDinner'][1].timestampdiff:0,   -data['dayAllTime'][1] !== undefined ? -data['dayAllTime'][1].timestampdiff :0],
                    ['화요일', -data['dayLunch'][0] !== undefined ?   -data['dayLunch'][0].timestampdiff:0, -data['dayDinner'][0] !== undefined ?  -data['dayDinner'][0].timestampdiff:0,   -data['dayAllTime'][0] !== undefined ? -data['dayAllTime'][0].timestampdiff :0],
                    ['수요일', -data['dayLunch'][2] !== undefined ?   -data['dayLunch'][2].timestampdiff:0, -data['dayDinner'][2] !== undefined ?  -data['dayDinner'][2].timestampdiff:0,   -data['dayAllTime'][2] !== undefined ? -data['dayAllTime'][2].timestampdiff :0],
                    ['목요일', -data['dayLunch'][3] !== undefined ?   -data['dayLunch'][3].timestampdiff:0, -data['dayDinner'][3] !== undefined ?  -data['dayDinner'][3].timestampdiff:0,   -data['dayAllTime'][3] !== undefined ? -data['dayAllTime'][3].timestampdiff :0],
                    ['금요일', -data['dayLunch'][4] !== undefined ?   -data['dayLunch'][4].timestampdiff:0, -data['dayDinner'][4] !== undefined ?  -data['dayDinner'][4].timestampdiff:0,   -data['dayAllTime'][4] !== undefined ? -data['dayAllTime'][4].timestampdiff :0],
                    ['토요일', -data['dayLunch'][5] !== undefined ?   -data['dayLunch'][5].timestampdiff:0, -data['dayDinner'][5] !== undefined ?  -data['dayDinner'][5].timestampdiff:0,   -data['dayAllTime'][5] !== undefined ? -data['dayAllTime'][5].timestampdiff :0],
                ];
                console.log(rightCells);
                setRightCell(rightCells);
            })
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect( async () => {
        await getCustomerAvgTime();
    }, [])

    useEffect(async ()=>{
        console.log("useEffect 실행");
        await getMenuOfCategory();
    }, [selectedCategory])


    const categoryButtonHandler = (e) => {
        console.log(e.target.name);
        setSelectedCategory(e.target.name);
    }

    const showRow = (cells, ele) => {
        return (
            Array(cells.length).fill(undefined, undefined, undefined).map((obj, j)=>
                <AverageCell key={j}>
                    {cells[j]}
                </AverageCell>
            )
        )
    }

    useEffect(()=>{console.log(rightCell);},[rightCell])

    return (
        <>
            <div>
            <Header text ={"메뉴별 평균 시간 정보"} restaurantName = {localStorage.getItem('storeName')}/>
            </div>
            <Div>
            <LeftSideDiv>
                <LargeTitle>+ 메뉴별 평균 준비 시간</LargeTitle>
                <ButtonDiv>
                    <CategoryButton id = '세트메뉴' name={'세트메뉴'} onClick={categoryButtonHandler}>세트<br/>메뉴</CategoryButton>
                    <CategoryButton id = '2~3인분메뉴' name={'2~3인분메뉴'} onClick={categoryButtonHandler}>2~3인분<br/>메뉴</CategoryButton>
                    <CategoryButton id = '식사메뉴' name={'식사메뉴'} onClick={categoryButtonHandler}>식사<br/>메뉴</CategoryButton>
                    <CategoryButton id = '사이드메뉴' name={'사이드메뉴'} onClick={categoryButtonHandler}>사이드<br/>메뉴</CategoryButton>
                    <CategoryButton id = '후식메뉴' name={'후식메뉴'} onClick={categoryButtonHandler}>후식<br/>메뉴</CategoryButton>
                    <CategoryButton id = '추가메뉴' name={'추가메뉴'} onClick={categoryButtonHandler}>추가<br/>메뉴</CategoryButton>
                    <CategoryButton id = '주류/음료' name={'주류/음료'} onClick={categoryButtonHandler}>주류/<br/>음료</CategoryButton>
                </ButtonDiv>
                {leftCell.length ===0 ? <NotExistDataDiv>메뉴가 존재하지 않습니다.</NotExistDataDiv> :
                <TableContainer component={Paper} style={{marginTop: '30px'}}>
                    <AverageTableStyle>
                        <TableHead>
                            <AverageRow>
                                {Array(leftColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                    <ColumnCell key={i}>{leftColumnName[i]}</ColumnCell>)}
                            </AverageRow>
                        </TableHead>
                        <TableBody >
                            {leftCell.map((td, i)=>
                                <AverageRow key={i}>
                                    {showRow(leftCell[i], i)}
                                </AverageRow>)
                            }
                        </TableBody>
                    </AverageTableStyle>
                </TableContainer>}
            </LeftSideDiv>
            <RightSideDiv>
                <LargeTitle>+ 고객 평균 소요 시간</LargeTitle>
                <div style={{float: 'right'}}>단위: 분</div>
                {rightCell.length ===0 ? <NotExistDataDiv>통계의 내용이 존재하지 않습니다.</NotExistDataDiv> :
                    <TableContainer component={Paper} style={{marginTop: '30px'}}>
                        <AverageTableStyle>
                            <TableHead>
                                <AverageRow>
                                    {Array(rightColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                        <ColumnCell key={i}>{rightColumnName[i]}</ColumnCell>)}
                                </AverageRow>
                            </TableHead>
                            <TableBody >
                                {rightCell.map((td, i)=>
                                    <AverageRow key={i}>
                                        {showRow(rightCell[i], i)}
                                    </AverageRow>)
                                }
                            </TableBody>
                        </AverageTableStyle>
                    </TableContainer>}
            </RightSideDiv>
            </Div>
        </>
    );
};

export default MenuAvgTimeTemplate;