import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import ModalButton from '../../../Components/Button/ModalButton';
import axios from 'axios';


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

const Input = styled.input`
    margin-left : 0.7rem;
    margin-top : 0.5rem;
    width : 1.4rem;
    height : 1.4rem;
`;

//메뉴 이름과 아이디
const DeleteMenu=({menu, id, price, category})=>{

    const [ingredients,setIngredients]=useState([]);
    const [check,setCheck]=useState(false);

    const getMenuInfos = async ()=>{
        console.log('실행!');
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            menuName : menu,
            managerId : managerId
        }

        menu && await axios.post('http://localhost:8080/menu/getByName',JSON.stringify(data),{
            headers : {
            "Content-Type" : `application/json;charset=utf8`,
        }}).then((res)=>{
            console.log(menu, res.data);
            setIngredients(res.data);
        }).catch(e=>{
            console.log(menu, e);
        })
    };

    useEffect(()=>{
        console.log('useeffect');
        getMenuInfos();
    },[]);

    const success = (e)=>{
        alert('메뉴가 삭제되었습니다');
        window.location.replace("/restaurantManagement/menu")
    }

    const fail = () =>{
        alert('메뉴를 삭제할 수 없습니다');
    }

    const handleCheck = async(e)=>{
        e.preventDefault();
        setCheck(!check);
        getMenuInfos();
    }

    const handleClick = async (e) =>{
        e.preventDefault();
        getMenuInfos();
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            menuName : menu,
            price : price,
            menuCategory : category,
            managerId : managerId,
            menuIngredientLists : ingredients
        };

        console.log(id, data, ingredients);

        const data2=JSON.stringify(data);
        console.log(data2);
        check ? axios.delete(`http://localhost:8080/menu/${id}`,
            {
                data : data2,
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }
    
        ).then((res)=>{
                console.log('id='+id,res);
                check && success();
            }).catch((error)=>{if (error.response){

                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.request._response );

                }else if(error.request){
                
                    console.log(error.request)
                
                }else if(error.message){
                
                    console.log(error.message);
                
                }
                fail();
                console.log(error);
                console.log(data)
            })
            :menu ? alert('체크 버튼을 눌러주세요'):alert('메뉴를 선택해주세요');
        }


    return(
        <>
        <Form>
        <Title>메뉴 삭제</Title>
        <Text>
        <Menu>{menu ? menu : '메뉴선택 필수!'}</Menu><TextByMenu>{menu?'메뉴를':''}</TextByMenu>
        </Text>
        <UnderText>
            {menu?'선택하신 게 맞습니까':'삭제할 메뉴를 선택해주세요!'}
            {menu && <Input type="checkbox" checked={check} onChange={handleCheck} />}
        </UnderText>
        <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em'}}>
            {menu && <ModalButton name={'삭제'} onClick={handleClick}></ModalButton>}
            <ModalButton name={'닫기'}></ModalButton>
        </div>
        </Form>
        </>
    )
}

export default DeleteMenu;