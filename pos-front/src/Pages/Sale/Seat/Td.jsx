import React from 'react';
import {useNavigate  } from 'react-router-dom';
import styled from 'styled-components';

const Seat = styled.td`
    height : 20.1vh;
    border : 2px solid #000000;
`;

const Td = ({rowIndex, cellIndex, size, style, data}) => {

    let navigate = useNavigate();

    const seatOnClickHandler = (index) =>{
        console.log("Click Seat : ", index);
        navigate('/sale', {state : [{seatNum : index , test : "Test 성공"}]});
    };
    
    let index = rowIndex * 4 + cellIndex;

    return (
        <Seat onClick = {()=> seatOnClickHandler(rowIndex * 4 + cellIndex)}>
            <div style={{display : 'flex', flexDirection:'column'}}>
                <div style={{verticalAlign:'top', textAlign:'left',fontWeight:'bold', marginBottom:'3rem', marginLeft:'0.3rem'}}>
                    {rowIndex * Math.sqrt(size) + cellIndex}
                </div>
                <div style={{}}>
                    <ul style={{listStyle:'none'}}>
                        <li style={{display:'flex', justifyContent:'space-between'}}>
                            <div>상품명</div>
                            <div style={{textAlign:'right', marginRight:'2rem'}}>개수</div>
                        </li><li style={{display:'flex', justifyContent:'space-between'}}>
                            <div>상품명</div>
                            <div style={{textAlign:'right', marginRight:'2rem'}}>개수</div>
                        </li><li style={{display:'flex', justifyContent:'space-between'}}>
                            <div>상품명</div>
                            <div style={{textAlign:'right', marginRight:'2rem'}}>개수</div>
                        </li>

                    </ul>
                </div>
                <div>
                    <div style={{textAlign:'right', marginRight:'2rem'}}>전체 가격 : 원</div>
                </div>
            </div>
        </Seat>
    );
};

export default Td;