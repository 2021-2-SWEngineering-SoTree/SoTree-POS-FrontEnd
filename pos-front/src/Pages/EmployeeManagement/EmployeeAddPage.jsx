import React from 'react';
import SignUpComponent from '../Login/SignUpComponent';

const EmployeeAddPage = ({visible, setSelectCategory}) => {
    return (
        <>  
            <div style={{overflow : 'auto' , width : '100%'}}>
                <SignUpComponent mode={'employee'} visible={visible} setSelectCategory={setSelectCategory}/>
            </div>
        </>
    );
}

export default EmployeeAddPage
