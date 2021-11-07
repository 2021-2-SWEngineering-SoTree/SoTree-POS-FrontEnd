import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header from '../../../Components/Header';
import CategoryButton from '../../../Components/Button/CategoryButton';
import Modal from '../../../Components/Modal/Modal';
import SmallModal from '../../../Components/Modal/SmallModal';
import AddMenu from './AddMenu';
import ChangeMenu from './ChangeMenu';
import DeleteMenu from './DeleteMenu';
import axios from 'axios';


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

const Table = styled.table`
    width : 77.5rem;
    height : 34.3rem;
    margin : 0.2rem 0.2rem;
    background-color: black;
`;

const Tr = styled.tr`
    height : 4.5rem;
`;

const Td = styled.td`
    width : 14%;
    background-color: #ffffff;
    &: focus-within {
        background-color: #7D7272;
    };
`;


const MenuTemplate = () => {

    const [menus, setMenus] = useState([]); //axios를 통해 메뉴가져옴.
    const [categoryMenus,setCategoryMenus] = useState([]); //전체 메뉴중 선택된 카테고리의 메뉴. 카테고리 바뀔때마다 불러옴.
    const [category, setCategory] = useState(''); //선택된 카테고리
    const [addMenu, setAddMenu] = useState(false);
    const [changeMenu, setChangeMenu] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState(false);


    const getMenus = async ()=>{
        await axios.post('http://localhost:8080/menu/getAll').then((res)=>{
            console.log(res.data);
            setMenus(res.data);
        }).catch(e=>{
            console.log(e);
        })
    };


    const getCategoryMenus = async (category) =>{
        console.log(category);
        await setCategoryMenus(menus.filter((menu)=>(menu.menuCategory===category)));
        console.log({categoryMenus});
    };

    useEffect(()=>{
        getMenus();
    },[]);

    const onClickAdd = () => {
        setAddMenu(!addMenu);
    }

    const onClickChange = () => {
        setChangeMenu(!changeMenu);
    }

    const onClickDelete = () => {
        setDeleteMenu(!deleteMenu);
    }

    const onClickCategoryButton = async(e) =>{
        console.log(e.target.name);
        setCategory(e.target.name);
        getCategoryMenus(category);
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
                <CategoryButton name={"세트메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"2~3인분메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"식사메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"사이드메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"후식메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"추가메뉴"} onClick={onClickCategoryButton}/>
                <CategoryButton name={"주류/음료"} onClick={onClickCategoryButton}/>
            </LeftTopDiv>
            <LeftBottomDiv>
                <Table>
                    <Tr>
                        <Td>
                            <div>
                                대왕돈까스
                            </div>
                            <div>
                                14000
                            </div>
                        </Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                    <Tr>
                        <Td>돈까스 세트<br/>12,000</Td>
                        <Td>대왕 돈까스<br/>14,000</Td>
                        <Td>돈까스<br/>8,000</Td>
                        <Td>튀김<br/>2,000</Td>
                        <Td>아메리카노<br/>2,000</Td>
                        <Td>우동 사리<br/>1,000</Td>
                        <Td>콜라<br/>2,000</Td>
                    </Tr>
                </Table>
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