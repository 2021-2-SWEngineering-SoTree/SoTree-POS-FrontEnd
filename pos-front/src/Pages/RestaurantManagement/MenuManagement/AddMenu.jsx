import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';

const PageWrapper = styled.div`
    margin : 2rem;
`;

const WrapperDiv = styled.div`
    & + & {
        margin-top : 0.2rem;
    }
    justify-content : center;
    margin-bottom : 0.2rem;
    display : flex;
    flex-direction : column;
`;

const InputLable = styled.label`
    font-size : 1.5rem;
`;

const Input = styled.input`
    height : 3rem;
    width : 23rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const SmallInput = styled.input`
    height : 2.6rem;
    width : 3rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.1rem;
    padding-right : 0.1rem;
    margin-top : 0.5rem;
    margin-left : 1rem;
    margin-right : 1rem;
    text-align : center;
`;

const Form = styled.form`
    display : flex;
    justify-content : center;
    flex-direction : column;
    //overflow-y:scroll; 식재료 많아지면 스크롤바
    height : 40rem;
`;

const CheckButton = styled.button`
    width : 5rem;
    height : 2.7rem;
    font-size : 1.5rem;
    background-color : #C4C4C4;
    margin-top : 0.5rem;
    margin-right : 0.3rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const CategorySelector = styled.select`
    height : 3.2rem;
    width : 24rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem; 
    margin-right : 0.5rem;
`;

const StockSelector = styled.select`
    height : 2.8rem;
    width : 12rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.5rem; 
    margin-right : 2rem;
    text-align : center;
`;

const Title = styled.h1`
    text-align:center;
    margin-top:-3rem;
`

const AddMenu = () =>{
    const [name, setName]=useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(null);
    const [ingredients,setIngredients]=useState([
        {
            ingredientName:'',
            count:0,
        },
        {
            ingredientName:'',
            count:0,
        },
        {
            ingredientName:'',
            count:0,
        },
        {
            ingredientName:'',
            count:0,
        }
    ]);
    const [finalIngredients, setFinalIngredients]=useState([]);
    const [allStock, setAllStock]=useState([]);
    const [register,setRegister]=useState(false);

    const getStocks = async ()=>{

        const managerId = window.localStorage.getItem('managerId');
        await axios.post('http://localhost:8080/stock/getAll',managerId,{
            headers : {
            "Content-Type" : "application/json",
        }}).then((res)=>{
            const menus=[{stockName:'없음'}];
            setAllStock(menus.concat(res.data));
            console.log(allStock);
        }).catch(e=>{
            console.log(e);
        })
    };

    const checkNull = () =>{
        
    }

    useEffect(()=>{
        setFinalIngredients(ingredients.filter(stock=>stock.count!==null && stock.ingredientName!=='없음' &&stock.ingredientName!==''))
        console.log(ingredients, finalIngredients);
        console.log(finalIngredients.length);
    },[ingredients]);

    useEffect(()=>{
        console.log('get menu useeffect');
        getStocks();
        console.log(allStock);
    },[]);

    //이름 입력
    const onChangeName = (e)=>{
        setName(e.target.value);
        console.log(category);
    }

    //가격 입력
    const onChangePrice = (e)=>{
        setPrice(+e.target.value);
    }

    //카테고리 선택
    const handleSelect =(e)=>{
        setCategory(e.target.value);
    };

    //식재료 선택
    const handleSelectStock = (e)=>{
        const index = e.target.parentNode.className;
        ingredients[index].ingredientName=e.target.value;
        setIngredients(ingredients.concat([]));
        console.log(ingredients);
    }

    //식재료 개수 선택
    const onChangeCount = (e)=>{
        const index = e.target.parentNode.className;
        ingredients[index].count=e.target.value;
        setIngredients(ingredients.concat([]));
        console.log(ingredients);
    }

    const success = (e)=>{
        alert('메뉴가 추가되었습니다');
        window.location.replace("/restaurantManagement/menu")
    }

    const fail = () =>{
        alert('메뉴를 추가할 수 없습니다');
    }

    const nullCheck = ()=>{
        console.log(name);
        console.log(category);
        console.log(price);
        console.log(finalIngredients);
        if(!name || !category || !price) return false;
        return true;
    }

    const addMenu = (e) =>{
        e.preventDefault();
        let managerId = window.localStorage.getItem('managerId');
        const data = JSON.stringify({
            menuName : name,
            price : price,
            managerId: managerId,
            menuCategory : category,
            menuIngredientLists : finalIngredients
        });
        console.log(data);
        !nullCheck() ? fail() : axios.post('http://localhost:8080/menu/add', data, {
            headers : {
            'Content-Type' : 'application/json',
        }}).then((res)=>{
            console.log(res);
            success();
        }).catch(e=>console.log(e));
    };

    return (
        <>
        <PageWrapper>
                <Title>메뉴 추가</Title>
                <Form>
                    <WrapperDiv>
                        <InputLable>메뉴명</InputLable>
                        <Input placeholder = {"메뉴명"} style={{flexGrow:3}} onChange={onChangeName} value={name}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>분류</InputLable>
                        <CategorySelector value={category} onChange={handleSelect}>
                            <option value="">------</option>
                            <option value="세트메뉴">세트메뉴</option>
                            <option value="2~3인분메뉴">2-3인분메뉴</option>
                            <option value="식사메뉴">식사메뉴</option>
                            <option value="사이드메뉴">사이드메뉴</option>
                            <option value="후식메뉴">후식메뉴</option>
                            <option value="추가메뉴">추가메뉴</option>
                            <option value="주류/음료">주류/음료</option>
                        </CategorySelector>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>가격</InputLable>
                        <Input placeholder = {"가격"} onChange={onChangePrice} value={price}/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>식재료</InputLable>
                        <div className={0} style={{display : 'flex', flexDirection : 'row'}}>
                            <StockSelector value={ingredients[0].ingredientName} onChange={handleSelectStock}>
                            <option value={''}>{''}</option>
                            <option value={'돼지고기'}>{'돼지고기'}</option>
                            <option value={'소고기'}>{'소고기'}</option>
                                {allStock.map((stock)=>
                                    (<option value={stock.stockName}>{stock.stockName}</option>)
                                )}
                 
                            </StockSelector>
                            <SmallInput onChange={onChangeCount} value={ingredients[0].count}/><h2>인분</h2>
                         </div>

                         <div className={1} style={{display : 'flex', flexDirection : 'row'}}>
                            <StockSelector value={ingredients[1].ingredientName} onChange={handleSelectStock}>
                            <option value={''}>{''}</option>
                            <option value={'돼지고기'}>{'돼지고기'}</option>
                            <option value={'소고기'}>{'소고기'}</option>
                                {allStock.map((stock)=>
                                    (<option value={stock.stockName}>{stock.stockName}</option>)
                                )}
                 
                            </StockSelector >
                            <SmallInput onChange={onChangeCount} value={ingredients[1].count}/><h2>인분</h2>
                         </div>

                         <div className={2} style={{display : 'flex', flexDirection : 'row'}}>
                            <StockSelector value={ingredients[2].ingredientName} onChange={handleSelectStock}>
                            <option value={''}>{''}</option>
                            <option value={'돼지고기'}>{'돼지고기'}</option>
                            <option value={'소고기'}>{'소고기'}</option>
                                {allStock.map((stock)=>
                                    (<option value={stock.stockName}>{stock.stockName}</option>)
                                )}
                 
                            </StockSelector>
                            <SmallInput onChange={onChangeCount} value={ingredients[2].count}/><h2>인분</h2>
                         </div>

                         <div className={3} style={{display : 'flex', flexDirection : 'row'}}>
                            <StockSelector value={ingredients[3].ingredientName} onChange={handleSelectStock}>
                            <option value={''}>{''}</option>
                            <option value={'돼지고기'}>{'돼지고기'}</option>
                            <option value={'소고기'}>{'소고기'}</option>
                                {allStock.map((stock)=>
                                    (<option value={stock.stockName}>{stock.stockName}</option>)
                                )}
                            </StockSelector>
                            <SmallInput onChange={onChangeCount} value={ingredients[3].count}/><h2>인분</h2>
                         </div>
                    </WrapperDiv>

                    <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '3em', marginBottom : '1em'}}>
                        <CheckButton onClick = {addMenu}>추가</CheckButton>
                        <CheckButton>닫기</CheckButton>
                    </div>
                </Form>
            </PageWrapper>

        </>
    )
};

export default AddMenu;
