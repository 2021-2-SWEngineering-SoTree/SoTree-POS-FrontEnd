import React from 'react';
import styled from 'styled-components';
import ModalButton from '../../../Components/Button/ModalButton'

const Title = styled.h1`
    text-align:center;
`;

const TextByMenu = styled.h3`
    margin-left : 0.5rem;
`

const UnderText = styled.h3`
    text-align:center;
`

const Text = styled.div`
    display : flex;
    align-items: center;
    justify-content: center;
`;

const Menu = styled.div`
    text-align : center;
    background-color : #ECECEC;
    height : 3.2rem;
    width : 17rem;
    font-size : 1.5rem;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const MessageStock = ({onClickIsChanged, quantity, stockName}) => {

    return(
        <>
            <Form>
                <Title>{stockName}</Title>
                <Text>
                    <TextByMenu>남은 수량이 </TextByMenu><Menu>{quantity}</Menu><TextByMenu>인분으로</TextByMenu>
                </Text>
                <UnderText>변경되었습니다.</UnderText>
                <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
                    <ModalButton name={'닫기'} onClick={onClickIsChanged}/>
                </div>
            </Form>
        </>
    );
};

export default MessageStock;