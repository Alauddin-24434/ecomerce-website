
import {
    createBrowserRouter,

} from "react-router-dom";
import Mainlayout from "../components/layout/Mainlayout";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import CartPage from "../pages/Cart/CartPage";
import Dashboardlayout from "../components/layout/Dashboardlayout";
import Dashboard from "../components/DashboardRelated/Dashboard/Dashboard";
import AddProduct from "../components/DashboardRelated/AddProduct/AddProduct";
import ProductList from "../components/DashboardRelated/ProductList/ProductList";


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/category",
                element: <CategoryPage />
            },
            {
                path: "/productDetails",
                element: <ProductDetailsPage />
            },
            {
                path: "/cart",
                element: <CartPage />
            },

        ]
    },
    {
        path: "/dashboard",
        element: <Dashboardlayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/dashboard/add-product",
                element: <AddProduct />
            },
            {
                path: "/dashboard/product-list",
                element: <ProductList />
            },


        ]
    },




])

export default Routes