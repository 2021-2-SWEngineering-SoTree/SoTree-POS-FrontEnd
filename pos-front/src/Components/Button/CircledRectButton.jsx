import React from 'react';
import styled from 'styled-components';
import {AiOutlineDown, AiOutlineUp, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CircledRectButtoneTemplate = styled.button`

    color : #000000;
    background-color : #D7FAFF;
    margin : 0.3rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:hover {
        background: #46A1F5;
    };
`

const CircledRectButton = ({radius, name, size,size2, onClick, kind}) => {
    return (
        <CircledRectButtoneTemplate style={{borderRadius : radius, width: size , height: size2 }}onClick={onClick}>
           {name && name}
           {kind===1 && <AiOutlineMinus/>}
           {kind===2 && <AiOutlinePlus/>}
           {kind===3 && <AiOutlineUp/>}
           {kind===4 && <AiOutlineDown/>}
        </CircledRectButtoneTemplate>
    )
}

export default CircledRectButton;

