import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header from '../../../Components/Header';
import CategoryButton from '../../../Components/Button/CategoryButton';
import Modal from '../../../Components/Modal/Modal';
import SmallModal from '../../../Components/Modal/SmallModal';
import AddMenu from './AddMenu';
import ChangeMenu from './ChangeMenu';
import DeleteMenu from './DeleteMenu';

const LeftDiv = styled.div`
    width : 78rem;
    margin : 2rem 0rem 2rem 6rem;
    padding : 1rem 1rem;
    gap : 1em;
    height : 44rem;
    border : 1px solid black;
    float : left;
    text-align:center; //중앙정렬
`;

const LeftTopDiv = styled.div`
    display : flex;
    width : 78rem;
    border : 1px solid black;
    display: inline-block; //중앙정렬
`;

const LeftBottomDiv = styled.div`
    margin : 2rem 0rem;
    height : 35rem;
    width : 78rem;
    border : 1px solid black;
    display: inline-block;
`;

const RightDiv = styled.div`
    width: 21rem;
    margin : 11rem 4rem 2rem 0rem;
    padding : 1rem 2rem;
    flex-wrap: nowrap;
    gap: 1em;
    height : 35rem;
    border:1px solid black;
    float:right;
`;

const Button = styled.button`
    width : 20rem;
    height : 4rem;
    background: #EBE7E7;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.8rem;
    font-size : 1.3rem;
    margin-bottom : 4rem;
    cursor : pointer;
    
`;

const MenuTemplate = () => {

    const [addMenu, setAddMenu] = useState(0);
    const [changeMenu, setChangeMenu] = useState(0);
    const [deleteMenu, setDeleteMenu] = useState(0);

    const onClickAdd = () => {
        setAddMenu(!addMenu);
    }

    const onClickChange = () => {
        setChangeMenu(!changeMenu);
    }

    const onClickDelete = () => {
        setDeleteMenu(!deleteMenu);
    }

    return (
        <>
        <Modal visible={addMenu}>
            <AddMenu/>
        </Modal>
        <Modal visible={changeMenu}>
            <ChangeMenu/>
        </Modal>

        <SmallModal visible={deleteMenu}>
            <DeleteMenu name={'돈까스'}/>
        </SmallModal>
        <Header text ={"메뉴 관리"} restaurantName = {"혜민이네 돈까스"}/>
        <LeftDiv>
            <LeftTopDiv>
                <CategoryButton name={"세트메뉴"}/>
                <CategoryButton name={"2-3인분메뉴"}/>
                <CategoryButton name={"식사메뉴"}/>
                <CategoryButton name={"사이드메뉴"}/>
                <CategoryButton name={"후식메뉴"}/>
                <CategoryButton name={"추가메뉴"}/>
                <CategoryButton name={"주류/음료"}/>
            </LeftTopDiv>
            <LeftBottomDiv>
            </LeftBottomDiv>
        </LeftDiv>

        <RightDiv>
                <Button onClick={onClickAdd}>메뉴 추가</Button>
                <Button onClick={onClickChange}>메뉴 변경</Button>
                <Button onClick={onClickDelete}>메뉴 삭제</Button>
        </RightDiv>
        </>
    );
};

export default MenuTemplate;