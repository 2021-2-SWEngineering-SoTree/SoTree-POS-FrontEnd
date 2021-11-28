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

// table style
const AverageTableStyle = styled.table`
    min-width: 580px;
    width: 100%;
`;

const createLeftRowData = (number, menu, avgTime) => {
    return [number, menu, avgTime];
}

const createRightRowDate = (day, lunch, dinner, full) => {
    return [day, lunch, dinner, full];
}


const MenuAvgTimeTemplate = () => {

    const [leftCell, setLeftCell] = useState([]);
    const [rightCell, setRightCell] = useState([]);

    const leftColumnName = ['번호', '메뉴', '평균 준비 시간(분)'];
    const rightColumnName = ['요일', '점심타임(L)', '저녁타임(D)', '영업시간 전체(F)'];

    const rightCells = [
        createRightRowDate('전체', '15','15','15'),
        createRightRowDate('평일', '15','15','15'),
        createRightRowDate('주말', '15','15','15'),
        createRightRowDate('일요일', '15','15','15'),
        createRightRowDate('월요일', '15','15','15'),
        createRightRowDate('화요일', '15','15','15'),
        createRightRowDate('수요일', '15','15','15'),
        createRightRowDate('목요일', '15','15','15'),
        createRightRowDate('금요일', '15','15','15'),
        createRightRowDate('토요일', '15','15','15'),
    ];

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
                    leftCells.push(
                        createLeftRowData(i, key, res.data[key])
                    )
                }
                setLeftCell(leftCells);
                console.log(leftCells);
            })
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(async ()=>{
        console.log("useEffect 실행");
        await getMenuOfCategory()
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
                <TableContainer component={Paper} style={{marginTop: '30px'}}>
                    <AverageTableStyle>
                        <TableHead>
                            <AverageRow>
                                {Array(leftColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                    <ColumnCell key={i}>{leftColumnName[i]}</ColumnCell>)}
                            </AverageRow>
                        </TableHead>
                        <TableBody >
                            {leftCell.length ===0 ? <AverageCell>메뉴가 존재하지 않습니다.</AverageCell> : null}
                            {leftCell.map((td, i)=>
                                <AverageRow key={i}>
                                    {showRow(leftCell[i], i)}
                                </AverageRow>)
                            }
                        </TableBody>
                    </AverageTableStyle>
                </TableContainer>
            </LeftSideDiv>
            <RightSideDiv>
                <LargeTitle>+ 고객 평균 소요 시간</LargeTitle>
                    <TableContainer component={Paper} style={{marginTop: '30px'}}>
                        <AverageTableStyle>
                            <TableHead>
                                <AverageRow>
                                    {Array(rightColumnName.length).fill(undefined, undefined, undefined).map((tr,i)=>
                                        <ColumnCell key={i}>{rightColumnName[i]}</ColumnCell>)}
                                </AverageRow>
                            </TableHead>
                            <TableBody >
                                {rightCells.length ===0 ? <AverageCell>메뉴가 존재하지 않습니다.</AverageCell> : null}
                                {rightCells.map((td, i)=>
                                    <AverageRow key={i}>
                                        {showRow(rightCells[i], i)}
                                    </AverageRow>)
                                }
                            </TableBody>
                        </AverageTableStyle>
                    </TableContainer>
            </RightSideDiv>
            </Div>
        </>
    );
};

export default MenuAvgTimeTemplate;