import React from 'react';
import styled from 'styled-components';

const Cell = styled.td`
    height : 11vh;
    border : 1px solid #000000;
`;

const Td = ({rowIndex, cellIndex}) => {
    return (
        <Cell>
            <div style={{display: 'flex', flexDirection:'column'}}>
                <div style={{marginBottom : '1.3rem'}}>
                    재고나 메뉴 명 {rowIndex*7 + cellIndex+1}
                </div>
                <div>
                    수량이나 가격 정보
                </div>
            </div>
        </Cell>
    );
};

export default Td;