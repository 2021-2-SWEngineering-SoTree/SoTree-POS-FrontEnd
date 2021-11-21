import React from 'react';
import styled from 'styled-components';

const CategoryButtonTemplate = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 4.7rem;
    width : 9rem;
    margin : 1rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`



const CategoryButton = ({name, onClick}) => {
    return (
        <CategoryButtonTemplate onClick={onClick} name={name}>
           {name}
        </CategoryButtonTemplate>
    )
}

export default CategoryButton;

