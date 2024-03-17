import { useParams } from "react-router-dom";


const Fail = () => {
    const { tranId } = useParams()
    return (
        <div>
            <h2>Payment fail{tranId}</h2>
        </div>
    );
};

export default Fail;