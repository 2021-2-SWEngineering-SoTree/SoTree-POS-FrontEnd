import React, {useState, useEffect} from 'react';
import Header from '../../Components/Header';
import axios from 'axios';

const FindUserInfo = () => {

    const [response, setResponse] = useState('');

    const testConnect = async ()=>{

        await axios.post('http://localhost:8080/connectionTest').then((res)=>{
            console.log(res.data);
            setResponse(res.data);
        }).catch((Error)=>{
            console.log(Error);
        })
    };

    useEffect(()=>{
        testConnect();
    },[])

    return (
        <>
            <Header text ={"아이디/비밀번호 찾기"} restaurantName = {""}/>  
            <h1>회원정보 찾기!!!!!!!!!!</h1>

            <h4>통신 테스트</h4>
            {response ? <><h2>성공</h2><h3>{response}</h3></> : <h2>통신 실패</h2>}
            
        </>
    );
};

export default FindUserInfo;