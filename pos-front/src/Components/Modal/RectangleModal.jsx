import React from 'react';
import styled from "styled-components";

const ModalHeaderStyled = styled.div`
    width: ${(props) => (props.mode === 'employee' ? '70rem' : props.mode==='delete'?'30rem':'40rem')};
    height : ${(props) => (props.mode === 'delete' ? '34rem' :'50rem')};
    background-color: #474D4E;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border: 8px solid #474D4E;
    border-bottom: 0px;
    overflow : auto;
`;

const ModalContentStyled = styled.div`
    width: ${(props) => (props.mode === 'employee' ? '70rem' : props.mode==='delete'?'30rem':'40rem')};
    height : ${(props) => (props.mode === 'delete' ? '30rem' :'46rem')};
    background-color: white;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: absolute;
    left: 50%;
    top: 53.5%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border: 8px solid #474D4E;
    border-top: 0px;
    overflow : auto;
`;

const ModalStyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    background-color: rgba(0,0,0,0.4);
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
`;

const ModalRightButton = styled.button`
    position: relative;
    float: right;
    height : 3.0rem;
    width: 3.0rem;
`;

const StringStyle = styled.div`
    color: white;
    vertical-align: middle;
    float: left;
    font-size: 35px;
`;

const RectangleModal = ({setSelectCategory, visible, children, TitleName, mode}) => {

    const cancelClickHandler = () => {
        setSelectCategory(!visible);
    }

    return (
        <>
            <ModalStyledContainer visible={visible}>
                <ModalHeaderStyled visible={visible} mode = {mode}>
                    <StringStyle>{TitleName}</StringStyle>
                    <ModalRightButton onClick={cancelClickHandler}>X</ModalRightButton>
                </ModalHeaderStyled>
                <ModalContentStyled visible={visible} mode = {mode}>
                    {children}
                </ModalContentStyled>
            </ModalStyledContainer>
        </>
    )

}

export default RectangleModal;