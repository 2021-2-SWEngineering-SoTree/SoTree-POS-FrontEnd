import React from 'react'
import styled from 'styled-components'

const ModalButtonTemplate = styled.button`
    width : 6rem;
    height : 3.2rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-right : 1rem; 
    margin-left : 1rem;
    border-radius : 0.5rem;
    padding : 0;
    
`;

const ModalButton = ({name, onClick})=>{
    return (
        <ModalButtonTemplate onClick={onClick}>
            {name}
        </ModalButtonTemplate>
    )
}

export default ModalButton;