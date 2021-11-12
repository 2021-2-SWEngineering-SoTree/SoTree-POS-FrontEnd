import { useLocation, useParams } from "react-router";
import Header from "../../Components/Header";
import styled from 'styled-components';
import Calculator from "../../Components/Calculator/Calculator";
import CircledRectButton from "../../Components/Button/CircledRectButton";
import { AiOutlineUp, AiOutlineDown, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
`;

const RightTopBottomDiv = styled.div`
    height : 85%;
    border : 1px solid black;
`;


const RightBottomDiv = styled.div`
    height : 20%;
    border : 1px solid black;
`;

const SalePage = () => {
    
    let params = useLocation();

    return (
        <>
            
            <Header text ={"판매"} restaurantName = {"혜민이네 돈까스"}/>
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
                    </LeftTopDiv>

                    <LeftBottomDiv>
                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton color={'#D7FAFF'} name={'전체\n취소'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'선택\n취소'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'할인\n적용'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'수량\n변경'} size={'5rem'} radius={'25px'}/>
                            </LeftBottomTopDiv>
                        </LeftBottomInDiv>

                        <LeftBottomInDiv>
                            <LeftBottomTopDiv>
                                <CircledRectButton color={'#D7FAFF'} name={'-'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'+'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'△'} size={'5rem'} radius={'25px'}/>
                                <CircledRectButton color={'#D7FAFF'} name={'▽'} size={'5rem'} radius={'25px'}/>
                            </LeftBottomTopDiv>
                            <Calculator num={'2.6em'} num2={'5.5em'}/>
                            
                        </LeftBottomInDiv>
                    </LeftBottomDiv>
                </LeftDiv>

                <RightDiv>
                    <RightTopDiv>
                        <RightTopTopDiv>
                            
                        </RightTopTopDiv>
                        <RightTopBottomDiv>

                        </RightTopBottomDiv>
                    </RightTopDiv>
                    <RightBottomDiv>

                    </RightBottomDiv>
                </RightDiv>

            </Div>
        </>
    );
};

export default SalePage;
