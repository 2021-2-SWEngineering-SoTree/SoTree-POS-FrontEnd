import React from 'react';
import SignUpComponent from '../Login/SignUpComponent';

const EmployeeAddPage = () => {
    return (
        <>  
            <div style={{overflow : 'auto' , width : '100%'}}>
                <SignUpComponent mode={'employee'}/>
            </div>
        </>
    );
}

export default EmployeeAddPage
