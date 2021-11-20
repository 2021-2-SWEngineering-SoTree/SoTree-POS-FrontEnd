import React, { useEffect, useState } from 'react';
import {useNavigate  } from 'react-router-dom';
import styled from 'styled-components';

const Seat = styled.td`
    height : 20.1vh;
    border : 2px solid #000000;
    background-color : ${(props)=>props.colors}
`;

const Td = ({rowIndex, cellIndex, size, top, tableData}) => {

    let navigate = useNavigate();

    const seatOnClickHandler = (index) =>{
        console.log("Click Seat : ", index);
        console.log(tableData);
        const seatInfo = rowIndex * 4 + cellIndex;
        navigate('/sale', {state : 
            [
                {seatNum : seatInfo},
            ],
                            
        });
    };
    
    const index = rowIndex * 4 + cellIndex >= 100 ? rowIndex * 4 + cellIndex - 100: rowIndex * 4 + cellIndex;

    const getDetailInfo = ()=>{
        return (
        <>
             {tableData !== undefined ? tableData.length > index ? tableData[index].orderDetailSummaries.length > 0 ? tableData[index].orderDetailSummaries.map((data, i)=>
            <>
                {i < 4 ?
                <>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>{data.menu.menuName}</div>
                    <div style={{textAlign:'right', marginRight:'2rem'}}>{data.quantity}</div>
                </li>
                </>
                :
                null
            }
            </>
            )
            : null
            : null
            :null}
        </>
        )
    }

    return (
        tableData !== undefined ? 
            <>
            <Seat onClick = {()=> seatOnClickHandler(rowIndex * 4 + cellIndex)} colors = {tableData.length > index ? tableData[index].orderId < 0 ? "white" : "#D7FAFF" : "white"} >
                <div style={{display : 'flex', flexDirection:'column'}}>
                    <div style={{verticalAlign:'top', textAlign:'left',fontWeight:'bold', marginBottom:'1rem', marginLeft:'0.3rem'}} >
                        {rowIndex * Math.sqrt(size) + cellIndex + 1}
                    </div>
                    {tableData.length > index ? 
                    tableData[index].orderId < 0 ? Array(4).fill().map(()=><><li style={{display:'flex', justifyContent:'space-between'}}><dv style={{height:'100%'}}><br/></dv></li></>) : 
                    <>
                    <ul style={{listStyle:'none'}}>
                    {getDetailInfo()}
                    {
                        tableData[index].orderDetailSummaries.length <= 4 ? null
                        : 
                            <>
                                <li style={{display:'flex', justifyContent:'space-between'}}>
                                    <div></div>
                                    <div style={{textAlign:'right', marginRight:'0.4rem', fontSize : '1rem', marginBottom:'-0.5rem'}}>외 {tableData[index].orderDetailSummaries.length-4}개...</div>
                                </li>
                            </>
                    }
                    </ul>
                    </>
                    : Array(3).fill().map(()=><><li style={{display:'flex', justifyContent:'space-between'}}><dv style={{height:'100%'}}><br/></dv></li></>)}
                    <div>
                        <div style={{textAlign:'right', marginRight:'2rem'}}>전체 가격 : {tableData.length > index ? tableData[index].totalPrice > 0 ? tableData[index].totalPrice+"원" : "0원" : "0원"}</div>
                    </div>
                </div>
            </Seat>
            </> : null
        
    );
};

export default Td;