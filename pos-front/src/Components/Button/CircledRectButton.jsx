import React from 'react';
import styled from 'styled-components';

const CircledRectButtoneTemplate = styled.button`

    color : #000000;
    margin : 0.3rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #46A1F5;
    };
`



const CircledRectButton = ({color, radius, name, size, onClick}) => {
    return (
        <CircledRectButtoneTemplate style={{ borderRadius : radius, width: size , height: size }}onClick={onClick}>
           {name}
        </CircledRectButtoneTemplate>
    )
}

export default CircledRectButton;

