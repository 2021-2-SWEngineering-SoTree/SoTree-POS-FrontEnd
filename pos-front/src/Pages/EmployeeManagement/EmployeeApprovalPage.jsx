import styled from 'styled-components';
import React, {useEffect, useState} from "react";
import MintFormTable from "../../Components/Table/MintFormTable";
import RectangleModal from "../../Components/Modal/RectangleModal";
import EmployeeCommutingPage from "./EmployeeCommutingPage";
import ApprovalWorkSchedulePage from "./ApprovalWorkSchedulePage";

const CreateRowData = (choice, number, name, id, birthday, email, phone, approval) => {
    return [choice, number, name, id, birthday, email, phone, approval];
}


const EmployeeApprovalPage = ({setGetNumber}) => {

    const [approval, setApproval] = useState(false);
    const [reConstruct, setReconstruct] = useState([0, '', '' ]);

    let selectedApprovalEmployee = [];
    let selectedApprovalEmployeeId = -1;

    const columnName = ['선택', '번호', '이름', 'ID','생년월일', '이메일', '전화번호', '승인' ];
    const cello = [
        CreateRowData('blink', 1, '김더미', '1234', '1997-01-30',
        'ghldtjd901@naver.com', '010-2249-7719', 'approval')
    ]

    const approvalClickHandler = () => {
        setApproval(!approval);
    }

    return (
        <>
            <RectangleModal setSelectCategory={setApproval} visible={approval} TitleName={"직원 승인"}>
                <ApprovalWorkSchedulePage/>
            </RectangleModal>
            <MintFormTable columnName={columnName} cells={cello} setGetNumber={setGetNumber} clickListener={approvalClickHandler}/>
        </>
    )
}

export default EmployeeApprovalPage;