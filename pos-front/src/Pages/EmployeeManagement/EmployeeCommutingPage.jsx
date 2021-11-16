import React, {useEffect} from 'react';
import styled from "styled-components";
import axios from "axios";


const LargeButton = styled.button`
    width : 6rem;
    height : 5.5rem;
    font-size : 1.2rem;
    background-color : #C4C4C4;
    margin-right : 1rem;
    border-radius : 0.5rem;
    padding : 0;
    float: left;
`;


const WrapperDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    justify-content : center;
    margin-bottom : 1rem;
    display : flex;
    flex-direction : column;
    right: 50%;
    left: 50%;
`;


const InnerDiv = styled.div`
    & + & {
      margin-top : 1rem;
    }
    display: flex;
    justify-content : center;
`;


const HeaderLabel = styled.label`
    padding-top: 1.0rem;
    font-size : 1.5rem;
    display: flex;
    justify-content : center;
`;


const ContentLabel = styled.label`
    font-size: 1.0rem;
    align-content: center;
    text-align: center;

`;


const Input = styled.input`   
    height : 2.0rem;
    width : 13rem;
    background-color : #F2F0F0;
    font-size : 1.0rem;
    border-radius : 10px;
    line-height : 2.5rem;
    padding-left : 0.5rem;
    padding-right : 0.5rem;
    margin-top : 0.7rem;
    margin-right : 0.5rem;
    margin-left : 1.0rem;
`;


const DividedHr = styled.hr`
  border: solid 1px #000000;
  width: 80%;
  height: 0;
  margin-bottom: 0; 
`;



const EmployeeCommutingPage = ({commute, setCommute, reConstruct, setReConstruct}) => {

    const date = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '').substr(0,16);

    useEffect(async () => {
        try {
            setReConstruct(reConstruct);
            console.log(reConstruct);
        } catch (e) {
            console.error(e.message);
        }
    }, [reConstruct]);


    const CancelClick = () => {
        setCommute(!commute)
    }

    const arrivalHandleClick = async(e) => {
        if (window.confirm("출근을 등록하시겠습니까?")) {
            let arrivalData = {
                employeeId: reConstruct[0],
                time: date,
                branchId: "1"
            }
            await axios.post('http://localhost:8080/recordCome', JSON.stringify(arrivalData),
                { headers: { "Content-Type" : `application/json`, } }).then((res)=>{
                console.log(res);
                alert("test, 출근 추가 되었음");
                setCommute(!commute);
            }).catch(error => {
                console.log(error);
                alert('출근 추가 오류, 다시진행해주세요');
            })
        }
        else { alert("출근 추가 오류"); }
    }

    const leaveHandleClick = async(e) => {
        if (window.confirm("test, 퇴근")) {
            let leaveDate = {
                employeeId: reConstruct[0],
                time: date,
                branchId: "1"
            }
            await axios.post('http://localhost:8080/recordOut', JSON.stringify(leaveDate),
                { headers: {"Content-Type" : `application/json`,}}).then((res)=>{
                    console.log(res);
                    alert("test, 퇴근 추가 되었음");
                    setCommute(!commute);
            }).catch(error => {
                console.log(error);
                alert('퇴근 추가 오류, 다시 진행해주세요');
            })
        }
        else { alert("퇴근 추가 오류"); }
    }


    return (
        <>
            <WrapperDiv>
                <InnerDiv>
                    <HeaderLabel>+ 선택된 직원 정보</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 번&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;호
                        <Input type="text" value={''||reConstruct[0]} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
                        <Input type="text" value={''||reConstruct[1]} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 직&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급
                        <Input type="text" value={''||reConstruct[2]} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <ContentLabel>+ 현재 시간
                        <Input type="text" value={''||date} onClick={CancelClick} style={{flexGrow:3}}/>
                    </ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <DividedHr/>
                </InnerDiv>
                <InnerDiv>
                    <HeaderLabel>+ 출퇴근</HeaderLabel>
                </InnerDiv>
                <InnerDiv>
                    <LargeButton onClick={arrivalHandleClick}>출근 하기</LargeButton>
                    <ContentLabel style={{lineHeight: '90px'}}>현재 시간이 출근 기록으로 등록됩니다.</ContentLabel>
                </InnerDiv>
                <InnerDiv>
                    <LargeButton onClick={leaveHandleClick}>퇴근 하기</LargeButton>
                    <ContentLabel style={{lineHeight: '90px'}}>현재 시간이 퇴근 기록으로 등록됩니다.</ContentLabel>
                </InnerDiv>
            </WrapperDiv>
        </>
    );
}

export default EmployeeCommutingPage
