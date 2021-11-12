import styled from 'styled-components';

const Templet = styled.div`
    height : 9.5%;
    display : flex;
    background-color : #474D4E;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
`

const LeftFont = styled.div`
    width : 40%;
    text-align:center;
    line-height:10%;
 
`

const RightFont = styled.div`
    width : 60%;
    text-align:center;
    line-height:10%;
`

const InfoSpace = ({name, value, color}) =>{
    return (
        <>
            <Templet>
                <LeftFont style={{color:color}}><h3>{name}</h3></LeftFont>
                <RightFont style={{color:color}}><h3>{value}</h3></RightFont>
            </Templet>
        </>
    )
}

export default InfoSpace;