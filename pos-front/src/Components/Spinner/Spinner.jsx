import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader';
import styled from "styled-components";

const LargeDiv = styled.div`
    min-width: 700px;
    width: 100%;
    text-align: center;
    margin-top: 200px;
`;

const Spinner = () => {

    return (

        <LargeDiv>
            <ScaleLoader height="160" width="32" color="#6b5ce7" radius="8"/>
        </LargeDiv>

    );
}

export default Spinner