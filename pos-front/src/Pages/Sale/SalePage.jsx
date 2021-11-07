import { useLocation, useParams } from "react-router";
import Header from "../../Components/Header";

const SalePage = () => {
    
    let parmas = useLocation();

    return (
        <>
        <Header text ={"판매"} restaurantName = {"혜민이네 돈까스"}/>
        <div style={{textAlign:'center'}}>
            <h2>
                {parmas.state[0].seatNum}번자리가 선택되었습니다!!!.
            </h2>
                {console.log(parmas)}
            <div>
                {parmas.state[0].test}
            </div>
        </div>
        </>
    );
};

export default SalePage;