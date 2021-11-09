import React from 'react';
import styled from 'styled-components';
import ModalButton from '../../../Components/Button/ModalButton'

const Title = styled.h1`
    text-align:center;
`;

const TextByMenu = styled.h2`
    margin-left : 1rem;
`

const UnderText = styled.h2`
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
    font-size : 2rem;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
`;

const DeleteStock = ({name, visible}) => {

    return(
        <>
            <Form>
                <Title>가져온 값.</Title>
                <Text>
                    <TextByMenu>남은 수량이 </TextByMenu><Menu>{name}</Menu><TextByMenu>인분 으로</TextByMenu>
                </Text>
                <UnderText>변경되었습니다.</UnderText>
                <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
                    <ModalButton name={'닫기'} onClick={()=> {visible= !visible; console.log(visible)}}/>
                </div>
            </Form>
        </>
    );
};

export default DeleteStock;