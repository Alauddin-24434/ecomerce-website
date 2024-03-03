import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Mainlayout = () => {
    return (
        <div>
        <div className='bg-white'>
       {/* navbar */}
       <Navbar/>
        </div>
          <Outlet></Outlet>
          <div>
           {/* footer */}
          </div>
      </div>
    );
};

export default Mainlayout;