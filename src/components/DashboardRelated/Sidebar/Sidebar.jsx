import { MdDashboard , MdAddBox} from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const dummyData = [
        {
            id: 1,
            title: "Dashboard",
            icon: <MdDashboard/>,
            path: "/dashboard"
        },
        {
            id: 2,
            title: "Add Product",
            icon: < MdAddBox />,
            path: "/dashboard/add-product"
        },
        {
            id: 4,
            title: "Product List",
            icon: <FaClipboardList />,
            path: "/dashboard/product-list"
        },
    ];

    return (
        <>
            <div className='w-[250px] h-[100vh] bg-white text-black shadow-lg fixed z-50 flex flex-col'>
                {/* Header */}
                {/* Menu items */}
                <div className='m-4 flex-1'>
                    <ul className='flex flex-col gap-3'>
                        {dummyData.map(item => (
                            <NavLink key={item.id} to={item.path}>
                                <li className='flex text-black gap-2 h-12 items-center px-2 font-semibold'>
                                    {item.icon}
                                    <p>{item.title}</p>
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
                {/* Footer */}
            </div>
        </>
    );
};

export default Sidebar;
