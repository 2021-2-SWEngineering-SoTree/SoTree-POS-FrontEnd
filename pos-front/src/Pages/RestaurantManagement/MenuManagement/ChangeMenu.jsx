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
    margin-right : 0.8rem; 
    border-radius : 0.5rem;
    padding : 0;
`;

const Button = styled.button`
    width : 9rem;
    height : 3.5rem;
    font-size : 2rem;
    background-color : #C4C4C4;
    margin-top : 4rem;
    margin-right : 0.8rem; 
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

const ChangeMenu = ({changemenu, menu, id, menuprice, menucategory}) =>{

    const [name, setName]=useState(menu);
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [ingredients,setIngredients]=useState([
        {
            ingredientName:'',
            count:null,
        },
        {
            ingredientName:'',
            count:null,
        },
        {
            ingredientName:'',
            count:null,
        },
        {
            ingredientName:'',
            count:null,
        }
    ]);

    const [finalIngredients, setFinalIngredients]=useState([]);
    const [allStock, setAllStock]=useState([]);

    const load = (e)=>{
        setName(menu);
        setCategory(menucategory);
        setPrice(menuprice);
        e.preventDefault();
        !menu && alert('메뉴를 선택해주세요');
    }
    
    const getStocks = async ()=>{
        let managerId = window.localStorage.getItem('managerId');
        await axios.post('http://localhost:8080/stock/getAll', managerId,{
            headers : {
            "Content-Type" : `application/json`,
        }}).then((res)=>{
            const menus=[{stockName:'없음'}];
            setAllStock(menus.concat(res.data));
            console.log(allStock);
        }).catch(e=>{
            console.log(e);
        })
    };

    useEffect(()=>{
        ingredients && setFinalIngredients(ingredients.filter(stock=>stock.count!==null && stock.ingredientName!=='없음' &&stock.ingredientName!==''))
        console.log(ingredients, finalIngredients);
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
        setPrice(e.target.value);
    }

    //카테고리 선택
    const handleSelect =(e)=>{
        console.log(e.target.value);
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
        alert('메뉴가 수정되었습니다');
        window.location.replace("/restaurantManagement/menu")
    }

    const fail = () =>{
        alert('메뉴를 수정할 수 없습니다');
    }

    const nullCheck = ()=>{
        console.log(category);
        console.log(price);
        //finalIngredients.length===0
        if(!category || !price) return false;
        return true;
    }

    const changeMenu = (e) =>{
        e.preventDefault();
        let managerId = window.localStorage.getItem('managerId');
        const data = {
            menuName : menu,
            price : price,
            managerId:managerId,
            menuCategory : category,
            menuIngredientLists : finalIngredients
        };
        console.log(data);

        const data2 = JSON.stringify(data);
        console.log(data2);
        !nullCheck() ? fail() : axios.put(`http://localhost:8080/menu/${id}`,
            data2,
            {    
                headers : {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then((res)=>{
             console.log(res);
            success();
        }).catch(e=>{fail(); console.log(e, data)});
    };

    return (
        <>
        <PageWrapper>
                <Title>메뉴 수정</Title>
                <Form>
                    {!menu && (
                        <>
                        <Title style={{marginTop:'30%'}}>선택된 메뉴가 없습니다</Title>
                        <div style={{display : 'flex', justifyContent:'center', marginTop:'13em'}}>
                        {/* <CheckButton onClick={load}>Load</CheckButton> */}
                        <Button>닫기</Button>
                        </div>
                        </>
                    )}
                    {menu && (
                    <>
                    <WrapperDiv>
                        <InputLable>메뉴명</InputLable>
                        <Input placeholder = {menu} style={{flexGrow:3}} value={name} disabled/>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>분류</InputLable>
                        <CategorySelector placeholder={menucategory} value={category} onChange={handleSelect}>
                            <option value="">------</option>
                            <option value="세트메뉴">세트메뉴</option>
                            <option value="2~3인분메뉴">2-3인분메뉴</option>
                            <option value="식사메뉴">식사메뉴</option>
                            <option value="사이드메뉴">사이드메뉴</option>
                            <option value="후식메뉴">후식메뉴</option>
                            <option value="추가메뉴">추가메뉴</option>
                            <option value="주류음료">주류/음료</option>
                        </CategorySelector>
                    </WrapperDiv>
                    <WrapperDiv>
                        <InputLable>가격</InputLable>
                        <Input placeholder = {menuprice} onChange={onChangePrice} value={price}/>
                    </WrapperDiv>
                    {/* <WrapperDiv>
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
                    </WrapperDiv> */}

                    <div style={{display : 'flex', justifyContent:'flex-end', marginLeft : '10em', marginTop:'10em'}}>
                        {/* <CheckButton onClick={load}>Load</CheckButton> */}
                        <CheckButton onClick = {changeMenu}>수정</CheckButton>
                        <CheckButton>닫기</CheckButton>
                    </div>
                    </>
                    )}
                </Form>
            </PageWrapper>

        </>
    )
};

export default ChangeMenu;
