import { useLocation, useParams } from "react-router";
import Header from "../../Components/Header";

const SalePage = () => {
    
    let parmas = useLocation();

    return (
        <>
        <Header text ={"판매"} restaurantName = {"혜민이네 돈까스"}/>
        <div>
            {parmas.state[0].seatNum}!!!번자리가 선택되었습니다.
        </div>
            {console.log(parmas)}
        <div>
            {parmas.state[0].test}
        </div>
        </>
    );
};

export default SalePage;