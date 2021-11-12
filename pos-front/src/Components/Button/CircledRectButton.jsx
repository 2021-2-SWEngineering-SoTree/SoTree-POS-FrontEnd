import React from 'react';
import styled from 'styled-components';

const CircledRectButtoneTemplate = styled.button`

    color : #000000;
    background-color : #D7FAFF;
    margin : 0.3rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #46A1F5;
    };
`



const CircledRectButton = ({radius, name, size,size2, onClick}) => {
    return (
        <CircledRectButtoneTemplate style={{borderRadius : radius, width: size , height: size2 }}onClick={onClick}>
           {name}
        </CircledRectButtoneTemplate>
    )
}

export default CircledRectButton;

