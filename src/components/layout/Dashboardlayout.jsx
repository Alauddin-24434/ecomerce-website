import { Outlet } from "react-router-dom";
import Sidebar from "../DashboardRelated/Sidebar/Sidebar";


const Dashboardlayout = () => {
    return (
        <div className='flex gap-4'>
            <div className=''>
                <Sidebar/>
            </div>
            <div className='w-[80%] ml-60  justify-center'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboardlayout;