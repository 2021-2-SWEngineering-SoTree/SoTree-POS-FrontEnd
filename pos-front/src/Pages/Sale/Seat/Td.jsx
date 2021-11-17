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
        const seatIndex=(index>=100)?index-100:index;
        const orderId = tableData[seatIndex].orderId;
        const seatInfo = index+1;
        console.log(seatInfo,orderId);
        navigate('/sale', {state : 
            [
                {seatNum : seatInfo},
                {orderId : orderId}
            ],
                            
        });
    };
    
    const index = rowIndex * 4 + cellIndex >= 100 ? rowIndex * 4 + cellIndex - 100: rowIndex * 4 + cellIndex;

    const getDetailInfo = ()=>{
        return (
        <>
             {tableData !== undefined ? tableData.length > index ? tableData[index].orderDetailSummaries.length > 0 ? tableData[index].orderDetailSummaries.map((data, i)=>
            <>
                <li style={{display:'flex', justifyContent:'space-between'}}>
                    <div>{data.menu.menuName}</div>
                    <div style={{textAlign:'right', marginRight:'2rem'}}>{data.quantity}</div>
                </li>
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
            <Seat onClick = {()=> seatOnClickHandler(rowIndex * 4 + cellIndex)} colors = {tableData.length > index ? tableData[index].orderId < 0 ? "#white" : "#D7FAFF" : "white"} >
                <div style={{display : 'flex', flexDirection:'column'}}>
                    <div style={{verticalAlign:'top', textAlign:'left',fontWeight:'bold', marginBottom:'1rem', marginLeft:'0.3rem', marginTop:top}} >
                        {rowIndex * Math.sqrt(size) + cellIndex + 1}
                    </div>
                    {tableData.length > index ? 
                    tableData[index].orderId < 0 ? Array(4).fill().map(()=><><li style={{display:'flex', justifyContent:'space-between'}}><dv style={{height:'100%'}}><br/></dv></li></>) : 
                    <>
                    <ul style={{listStyle:'none'}}>
                    {getDetailInfo()}
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