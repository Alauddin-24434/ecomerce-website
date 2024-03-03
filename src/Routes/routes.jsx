
import {
    createBrowserRouter,

} from "react-router-dom";
import Mainlayout from "../components/layout/Mainlayout";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/CategoryPage/CategoryPage";


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/category",
                element:<CategoryPage/>
            },

        ]
    },



])

export default Routes