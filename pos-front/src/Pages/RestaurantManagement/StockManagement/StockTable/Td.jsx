import React from 'react';
import styled from 'styled-components';

const StockCell = styled.td`

  height : 11vh;
  border : 1px solid #000000;
`;

const Td = ({rowIndex, cellIndex}) => {
    const [currentClick, setCurrentClick] = React.useState(null);
    const [prevClick, setPrevClick] = React.useState(null);
    const GetClick = (e) => {
        setCurrentClick(e.target.id);
        console.log(e.target.id);
    };

    React.useEffect((e) => {
        const current = document.getElementById(currentClick);
        const prev = document.getElementById(prevClick);
        if (currentClick !== null) {
            console.log(current);
            current.style.color = "#000000";
            current.style.backgroundColor = "#C4C4C4";
        }

        if (prevClick !== null) {
            console.log(prevClick);
            prev.style.color = "#0F0F0F";
            prev.style.BackgroundColor = "#6e6e6e";
        }
        setPrevClick(currentClick);
    }, [currentClick]
    );

    const stockCellOnClickHandler = (index) => {
        console.log("Click Stock Cell : ", index);
    };

    return (
        <StockCell id = {rowIndex*7 + cellIndex+1} onClick = {GetClick}>
            <div id = {rowIndex*7 + cellIndex+1} style={{display: 'flex', flexDirection:'column'}}>
                <div id = {rowIndex*7 + cellIndex+1} style={{marginBottom : '1.3rem'}}>
                    <b id = {rowIndex*7 + cellIndex+1}>재고명 {rowIndex*7 + cellIndex+1}</b>
                </div>
                <div id = {rowIndex*7 + cellIndex+1}>
                    수량
                </div>
            </div>
        </StockCell>
    );

};

export default Td;