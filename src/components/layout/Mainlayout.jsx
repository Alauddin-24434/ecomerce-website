import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Mainlayout = () => {
  return (
    <div className='bg-slate-100'>
      <div >
        {/* navbar */}
        <Navbar />
      </div>
      <Outlet></Outlet>
      <div>
        {/* footer */}
      </div>
    </div>
  );
};

export default Mainlayout;