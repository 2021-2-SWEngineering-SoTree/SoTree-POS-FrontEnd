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
import SmallTable from '../../../Components/Table/SmallTable';

const LeftDiv = styled.div`
    width : 78rem;
    margin : 2rem 0rem 2rem 6rem;
    padding : 1rem 1rem;
    gap : 1em;
    height : 44rem;
    float : left;
    text-align:center; //중앙정렬
`;

const LeftTopDiv = styled.div`
    display : flex;
    width : 78rem;
    display: inline-block; //중앙정렬
`;

const LeftBottomDiv = styled.div`
    margin : 2rem 0rem;
    height : 35rem;
    width : 78rem;
    display: inline-block;
`;

const RightDiv = styled.div`
    width: 21rem;
    margin : 11rem 4rem 2rem 0rem;
    padding : 1rem 2rem;
    flex-wrap: nowrap;
    gap: 1em;
    height : 35rem;
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

    const [menus, setMenus] = useState([]); //axios를 통해 메뉴가져옴.
    const [categoryMenus,setCategoryMenus] = useState([]); //전체 메뉴중 선택된 카테고리의 메뉴. 카테고리 바뀔때마다 불러옴.
    const [category, setCategory] = useState(''); //선택된 카테고리

    const [addMenu, setAddMenu] = useState(false);
    const [changeMenu, setChangeMenu] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState(false);

    //테이블에서 선택한 메뉴의 인덱스
    const [index, setIndex]=useState(-1);
    const [selectedMenu, setSelectedMenu]=useState('');
    const [selectedId, setSelectedId]=useState(-1);
    const [selectedPrice,setSelectedPrice]=useState(0);
    const [selectedCategory, setSelectedCategory]=useState('');

    const getIndex=(index)=>{
        setIndex(index);
        console.log(typeof categoryMenus[index]);
    }

    useEffect(()=>{
        console.log('index change!');
        if(index>-1 && index<categoryMenus.length) {
            setSelectedMenu(categoryMenus[index].menuName);
            setSelectedId(categoryMenus[index].id);
            setSelectedPrice(categoryMenus[index].price);
            setSelectedCategory(categoryMenus[index].menuCategory);
        }
        else {
            setSelectedMenu('');
            setSelectedId(-1);
            setSelectedPrice(0);
            setSelectedCategory('');
        }
    },[index])

    const getMenus = async ()=>{
        await axios.post('http://localhost:8080/menu/getAll','1',{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            setMenus(res.data);
            console.log('dd');
        }).catch(e=>{
            console.log(e);
        })
    };

    const getCategoryMenus = (category) =>{
        setCategoryMenus(menus.filter((menu)=>(menu.menuCategory===category)));
    };

    const makeCategoryMenusFull = () =>{
        //setCategoryMenus(categoryMenus.concat(Array(49-categoryMenus.length).fill({id: '', menuName: '', price: '', menuCategory: ''})));
    }

    useEffect(()=>{
        console.log('change categoryMenus useeffect');
        getCategoryMenus(category);
        //makeCategoryMenusFull();
        console.log(categoryMenus);

    },[category]);

    useEffect(()=>{
        console.log('get menu useeffect');
        getMenus();
        console.log(menus);
    },[]);


    const onClickCategoryButton = (e) =>{
        setCategory(e.target.name);
        getCategoryMenus(e.target.name);
    }

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
            <ChangeMenu menu={selectedMenu} id={selectedId} menuprice={selectedPrice} menucategory={selectedCategory}/>
        </Modal>

        <SmallModal visible={deleteMenu}>
            <DeleteMenu menu={selectedMenu} id={selectedId} price={selectedPrice} category={selectedCategory}/>
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
                <SmallTable menu={categoryMenus} getIndex={getIndex} width={'78rem'} height={'35rem'}/> 
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