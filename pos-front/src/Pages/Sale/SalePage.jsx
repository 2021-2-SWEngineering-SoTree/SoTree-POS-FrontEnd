import { useLocation, useParams } from "react-router";
import Header from "../../Components/Header";
import styled from 'styled-components';
import Calculator from "../../Components/Calculator/Calculator";
import CircledRectButton from "../../Components/Button/CircledRectButton";
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import InfoSpace from "../../Components/InfoSpace";
import { BsFillCreditCard2BackFill,  } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { MdOutlineInput } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useState, useEffect} from 'react';
import axios from 'axios';
import SmallTable from "../../Components/Table/SmallTable";


const Div = styled.div`
    margin : 0.5rem 1rem;
    height : 85vh;
    display : flex;
`;

const LeftDiv = styled.div`
    margin : 0.5rem;
    width : 41%;
`
const LeftTopDiv = styled.div`
    height : 34%;
    border : 1px solid black;
    margin-bottom : 0.5rem;
`;

const LeftBottomDiv = styled.div`
    height : 65%;
    border : 1px solid black;
    display : flex;
`;

const LeftBottomInDiv = styled.div`
    width : 50%;
    border : 1px solid black;
`;

const LeftBottomTopDiv = styled.div`
    height : 20%;
    border : 1px solid black;
    text-align : center;
`

const RightDiv = styled.div`
    margin : 0.5rem;
    width : 57%;
`;

const RightTopDiv = styled.div`
    height : 79%;
    border : 1px solid black;
    margin-bottom : 0.5rem;
`;

const RightTopTopDiv = styled.div`
    height : 15%;
    border : 1px solid black;
    text-align:center;
`;

const RightTopBottomDiv = styled.div`
    height : 85%;
    border : 1px solid black;
`;

const BottomBottomRightDiv = styled.div`
    border : 1px solid black;
    width : 30%;
`;

const BottomBottomLeftDiv = styled.div`
    width : 70%;
    text-align: right;
    font-size : 2rem;
`;

const RightBottomDiv = styled.div`
    height : 20%;
    border : 1px solid black;
`;

const LeftBottomTwoDiv = styled.div`
    height : 80%;
    display : flex;
`

// td column style
const ColumnCell = styled.td`
    background-color: #8DDEE9;
    font-size: 20px;
    text-align: center;
`;

// td style
const OrderCell = styled.td`
    background-color: #F2F8F9;
    color: #000000;
    font-size: 20px;
    text-align: center;
    
`;

// tr style
const OrderRow = styled.tr`
    background-color: #555555;
`;

const ResultRow = styled.tr`
    background-color : #474D4E;
`
// table style
const TableStyle = styled.table`
    min-width: 700px;
    width: 100%;
`;

const Button = styled.button`
    width : 50%;
    height : 4em;
    background-color: #474D4E;
    color : #ffffff;
    border : 1px solid white;
    cursor : pointer;
`

const InfoContent = styled.div`
    padding : 2rem 0rem;
    text-align:center;
    font-size:20px;
    border : 1px solid black;
`

const NumberDiv = styled.div`
    border : 1px solid black;
    background-color : #F2F8F9;
    height : 2.7rem;
    margin-left : 15%;
    margin-right : 10%;
    margin-top : 2%;
    width : 70%;
    margin-bottom : 0.4rem;
`;

const LeftBottomBottomDiv = styled.div`
    margin-top : 10%;
    text-align : center;
    top : 50%;
    left : 50%;
`

const StaffSelector = styled.select`
    height : 2rem;
    width : 6rem;
    background-color : #F2F0F0;
    font-size : 1.5rem;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.5rem; 
    margin-right : 2rem;
    text-align : center;
`;

const ChangeButton = styled.button`
    background-color : #474D4E;
    color : white;
    height : 4rem;
    font-size:1.3rem;
    cursor : pointer;
`

const BottomButton = styled.button`
    background-color : #474D4E;
    color : white;
    height : 95%;
    width : 13.6%;
    font-size:1.3rem;
    cursor : pointer;
    margin : 0.2rem;
    border-radius : 15px;
`

const CategoryButton = styled.button`
    background-color : #474D4E;
    border-radius : 15px;
    color : #FFFFFF;
    height : 5.3rem;
    width : 13.9%;
    margin : 0.1rem;
    text-align : center;
    font-size : 1.3rem;
    cursor : pointer;
    &:focus {
        background: #8DDEE9;
    }
`

const UnderTableDiv = styled.div`
    width : 100%;
    height : 12%;
`



const CreateRowData = (no,name,price,count,sale,allprice,ex) => {
    return ({no,name,price,count,sale,allprice,ex});
}

const cells = [
    CreateRowData('1','치즈돈까스','11,000','1','0','11,000','')
];

const SalePage = () => {
    
    //let params = useLocation();
    const [index, setIndex]=useState(-1);
    const [menus, setMenus] = useState([]); //axios를 통해 메뉴가져옴.
    const [categoryMenus,setCategoryMenus] = useState([]); //전체 메뉴중 선택된 카테고리의 메뉴. 카테고리 바뀔때마다 불러옴.
    const [category, setCategory] = useState(''); //선택된 카테고리

    const [calculNum, setCalculNum] = useState(0);


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
    
    const getIndex=(index)=>{
        setIndex(index);
        console.log(typeof categoryMenus[index]);
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
        console.log(e.target.name);
        setCategory(e.target.name);
        getCategoryMenus(e.target.name);
    }

    return (
        <>
            
            <Header text ={"판매"} restaurantName = {localStorage.getItem('storeName')}/>
            {/* <div style={{textAlign:'center'}}>
                <h2>
                    {parmas.state[0].seatNum}번자리가 선택되었습니다!!!.
                </h2>
                    {console.log(parmas)}
                <div>
                    {parmas.state[0].test}
                </div>
            </div> */}
            <Div>

                <LeftDiv>
                    <LeftTopDiv>
                        <TableContainer component={Paper} margin='10px' style={{height : '90%',overflow: 'hidden',}}>
                            <TableStyle>
                                <TableHead>
                                    <OrderRow>
                                        <ColumnCell>번호</ColumnCell>
                                        <ColumnCell>메뉴명</ColumnCell>
                                        <ColumnCell>단가</ColumnCell>
                                        <ColumnCell>수량</ColumnCell>
                                        <ColumnCell>할인</ColumnCell>
                                        <ColumnCell>금액</ColumnCell>
                                        <ColumnCell>비고</ColumnCell>
                                    </OrderRow>
                                </TableHead>
                                <TableBody>
                                    {cells.map((cell) => (
                                        <OrderRow>
                                            <OrderCell component="th" scope="cell">{cell.no}</OrderCell>
                                            <OrderCell>{cell.name}</OrderCell>
                                            <OrderCell>{cell.price}</OrderCell>
                                            <OrderCell>{cell.count}</OrderCell>
                                            <OrderCell>{cell.sale}</OrderCell>
                                            <OrderCell>{cell.allprice}</OrderCell>
                                            <OrderCell>{cell.ex}</OrderCell>
                                            </OrderRow>
                                    ))}
                                </TableBody>
                            </TableStyle>                
                        </TableContainer>
                        <UnderTableDiv>
                            <TableStyle>
                                <TableHead>
                                    <ResultRow>
                                        <th style ={{width:'53%', color:'white'}}>합계</th>
                                        <th style ={{width:'10%', color:'white'}}>수량</th>
                                        <th style ={{width:'10%', color:'white'}}>할인금액</th>
                                        <th style ={{width:'16%', color:'white'}}>전체금액</th>
                                        <th></th>
                                    </ResultRow>
                                </TableHead>
                            </TableStyle>
                        </UnderTableDiv>
                    </LeftTopDiv>

                    <LeftBottomDiv>
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton name={'전체\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                                <CircledRectButton name={'선택\n취소'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                                <CircledRectButton name={'할인\n적용'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                                <CircledRectButton name={'수량\n변경'} size={'5rem'} size2={'5rem'} radius={'30px'}/>
                            </LeftBottomTopDiv>
                            <Button>결제 내역</Button>
                            <Button>담당자 정보</Button>
                            <InfoContent>
                                <b>Payment Requirement</b>
                            </InfoContent>
                            {/* 결제내역선택/담당자 정보 선택 시 나오는거 구분 */}
                            <InfoSpace name={'총 금 액'} value={35000} color={'white'}/>
                            <InfoSpace name={'할인금액'} value={3500} color={'white'}/>
                            <InfoSpace name={'받을금액'} value={31500} color={'yellow'}/>
                            <InfoSpace name={'받은금액'} value={0} color={'white'}/>
                            <InfoSpace name={'거스름돈'} value={0} color={'yellow'}/>

                            {/* 담당자 선택시 아래꺼 나옴 */}
                            {/* <InfoSpace name={'직원번호'} value={'직원번호'} color={'white'}/>
                            <InfoSpace name={'직 원 명'} value={'직원명'} color={'white'}/>
                            
                            <LeftBottomBottomDiv>
                                <StaffSelector onChange={''}>
                                    <option value={''}>{''}</option> 
                                    <option value={'홍길동'}>{'홍길동'}</option> 
                                    <option value={'서혜민'}>{'서혜민'}</option> 
                                </StaffSelector>
                                <ChangeButton>담당자 변경</ChangeButton>
                            </LeftBottomBottomDiv> */}

                        </LeftBottomInDiv>
                            
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={1}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={2}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'} radius={'30px'} kind={3}></CircledRectButton>
                                <CircledRectButton size={'5rem'} size2={'5rem'}radius={'30px'} kind={4}></CircledRectButton>
                            </LeftBottomTopDiv>
                            
                            <LeftBottomTwoDiv>
                                <BottomBottomLeftDiv>
                                    <NumberDiv>{calculNum}&nbsp;</NumberDiv>
                                    <Calculator num={'2.6em'} num2={'5.3em'} quantity={calculNum} changeQuantity={setCalculNum}/>
                                </BottomBottomLeftDiv>
                                <BottomBottomRightDiv>
                                    <CircledRectButton name={'포장'} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={'이벤트'} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={''} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                    <CircledRectButton name={'기타'} size={'6rem'} size2={'4.2rem'}radius={'20px'}/>
                                </BottomBottomRightDiv>
                            </LeftBottomTwoDiv>

                        </LeftBottomInDiv>
                    </LeftBottomDiv>
                </LeftDiv>

                <RightDiv>
                    <RightTopDiv>
                        <RightTopTopDiv>
                            <CategoryButton name={'세트메뉴'} onClick={onClickCategoryButton}>세트메뉴</CategoryButton>
                            <CategoryButton name={'2~3인분메뉴'} onClick={onClickCategoryButton}>2~3인분메뉴</CategoryButton>
                            <CategoryButton name={'식사메뉴'} onClick={onClickCategoryButton}>식사메뉴</CategoryButton>
                            <CategoryButton name={'사이드메뉴'} onClick={onClickCategoryButton}>사이드메뉴</CategoryButton>
                            <CategoryButton name={'후식메뉴'} onClick={onClickCategoryButton}>후식메뉴</CategoryButton>
                            <CategoryButton name={'추가메뉴'} onClick={onClickCategoryButton}>추가메뉴</CategoryButton>
                            <CategoryButton name={'주류/음료'} onClick={onClickCategoryButton}>주류/음료</CategoryButton>
                        </RightTopTopDiv>
                        <RightTopBottomDiv>
                            <SmallTable menu={categoryMenus} getIndex={getIndex} width={'100%'} height={'100%'}/>
                        </RightTopBottomDiv>
                    </RightTopDiv>
                    <RightBottomDiv>
                        <BottomButton><MdOutlineInput/>주문</BottomButton>
                        <BottomButton><BsFillCreditCard2BackFill/>현금</BottomButton>
                        <BottomButton><GiMoneyStack/>신용카드</BottomButton>
                        <BottomButton>복합결제</BottomButton>
                        <BottomButton><IoMdArrowRoundBack/>돌아가기</BottomButton>
                        <BottomButton>영수증관리</BottomButton>
                        <BottomButton>음식완성알림</BottomButton>
                    </RightBottomDiv>
                </RightDiv>

            </Div>
        </>
    );
};

export default SalePage;
