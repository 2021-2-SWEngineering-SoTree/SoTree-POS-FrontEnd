import styled from 'styled-components';
import React, {useEffect, useState} from "react";
import MintFormTable from "../../Components/Table/MintFormTable";
import RectangleModal from "../../Components/Modal/RectangleModal";
import EmployeeCommutingPage from "./EmployeeCommutingPage";
import ApprovalWorkSchedulePage from "./ApprovalWorkSchedulePage";




const EmployeeApprovalPage = ({cells, employeeIdForApproval, emptyApprovalFlag}) => {

    const [getNumber, setGetNumber] = useState(-1);
    const [approval, setApproval] = useState(false);
    const [reConstruct, setReconstruct] = useState([0, '', '', '' ]);

    useEffect(async () => {
        try {
            setReconstruct(reConstruct);
            console.log(reConstruct);
        } catch (e) {
            console.error(e.message);
        }
    }, [reConstruct, emptyApprovalFlag]);


    let selectedApprovalEmployee = [];
    let selectedApprovalEmployeeId = -1;

    const columnName = ['선택', '번호', '이름', 'ID','생년월일', '이메일', '전화번호', '승인' ];

    const approvalClickHandler = (j) => {
        console.log("j의 값: ", j);
        selectedApprovalEmployee = cells[j];
        selectedApprovalEmployeeId = employeeIdForApproval[j];
        // index(1): number, index(2):name, index(7): pos
        setReconstruct([selectedApprovalEmployee[1], selectedApprovalEmployee[2], selectedApprovalEmployee[7], selectedApprovalEmployeeId]);
        console.log("check row", reConstruct)
        setApproval(!approval);
    }

    return (
        <>
            <RectangleModal setSelectCategory={setApproval} visible={approval} TitleName={"직원 승인"}>
                <ApprovalWorkSchedulePage reConstruct={reConstruct} approval={approval} setApproval={setApproval}/>
            </RectangleModal>
            <MintFormTable columnName={columnName} cells={cells} setGetNumber={setGetNumber}
                           clickListener={approvalClickHandler} emptyFlag={emptyApprovalFlag}/>
        </>
    )
}

export default EmployeeApprovalPage;