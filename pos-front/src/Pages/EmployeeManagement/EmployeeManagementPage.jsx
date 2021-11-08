import Header from "../../Components/Header";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import EmployeeManagementTable from "./Table/EmployeeManagementTable";

const Div = styled.div`
  max-width: 1980px;
  padding: 20px;
  flex-wrap: nowrap;
  display: flex;
  gap: 1em;
  height: 680px;
`;

const LeftDiv = styled.div`
  width: 200%;
  height: 100%;
  flex-grow: 1;
  overflow: scroll;
`;

const RightDiv = styled.div`
  width: 70%;
  margin-top: 3%;
  margin-bottom: 3%;
  align-items: center;
`;

const InnerRightDiv = styled.div`
  vertical-align: middle;
  text-align: center;
  margin-top: 0;
  align-items: center;
`;

const Button = styled.button`
  top: 50%;
  width: 20rem;
  height: 4rem;
  background: #EBE7E7;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const Button2 = styled.button`
  top: 50%;
  width: 20rem;
  height: 4rem;
  background: #EBE7E7;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  font-size: 1.3rem;
  margin-bottom: 3rem;
`;

const EmployeeManagementPage = () => {
    return (
        <>
            <Header text={"직원 관리"} restaurantName={"혜민이네 돈까스"}/>
            <Div>
                <LeftDiv>
                    <EmployeeManagementTable/>
                </LeftDiv>
                <RightDiv>
                    <InnerRightDiv>
                        <Link to="/EmployeeManagement/WorkSchedulePage"><Button>근무표</Button></Link>
                        <Link to="/EmployeeManagement/Employee"><Button2>직원 출퇴근</Button2></Link>
                        <Link to="/EmployeeManagement/EmployeeActivitiesListPage"><Button>직원활동내역</Button></Link>
                        <Link to="/EmployeeManagement/EmployeeApprovalPage"><Button2>직원승인</Button2></Link>
                        <Link to="/EmployeeManagement/EmployeeAddPage"><Button>직원추가</Button></Link>
                        <Link to="/EmployeeManagement/EmployeeModifyPage"><Button>직원수정</Button></Link>
                        <Button>직원삭제</Button>
                    </InnerRightDiv>
                </RightDiv>
            </Div>
        </>
    );
};

export default EmployeeManagementPage;