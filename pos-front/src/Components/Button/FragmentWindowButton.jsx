import React from 'react';
import styled from 'styled-components';

const FragmentWindowButtonTemplate = styled.button`
    position: absolute;
    width: 217px;
    height: 80px;
    left: 1300px;
    top: 870px;
    background: #474D4E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
`

const CategoryButton = ({name, onClick}) => {
    return (
        <FragmentWindowButtonTemplate onClick={onClick} name={name}>
           {name}
        </FragmentWindowButtonTemplate>
    )
}

export default CategoryButton;

