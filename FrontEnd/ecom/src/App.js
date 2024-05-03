import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import RootLayout from './Pages/RootLayout';
import WelcomePage from './Pages/WelcomePage';
import {action as signupAction} from './Components/Signup';
import {action as loginAction} from './Pages/LoginPage';
import {tokenLoder, checkAuthLoader} from './util/auth';
import {action as logoutAction} from './Pages/Logout'
import UserListPage from './Pages/UserListPage';
import {loader as userListLoader} from './Pages/UserListPage';
import EditUserPage from './Pages/EditUserPage';
import {loader as userLoader} from './Pages/EditUserPage';
import {loader as deleteUser } from './Components/DeleteUser';
import ErrorPage from './Pages/ErrorPage';
//Categories
import CategoriesPage from './Pages/CategoriesPage';
import { action as categoryAction } from './Components/Categories';
import CategoryListPage from './Pages/CategoryListPage';
import { loader as categoryListLoader } from './Pages/CategoryListPage';
import CategoryEditPage from './Pages/CategoryEditPage';
import { loader as categoryEditLoader } from './Pages/CategoryEditPage';
import deleteCategory from './Components/DeleteCategory';
import { loader as deleteCategoryLoader } from './Components/DeleteCategory';
//Products
import ProdcutPage from './Pages/ProductPage';
import { loader as catLoader } from './Pages/ProductPage';
import { action as productAction } from './Components/Products';
import ProductListPage from './Pages/ProductListPage';
import { loader as productListLoader } from './Pages/ProductListPage';
import ProductEditPage from './Pages/ProductEditPage';
import { loader as productEditLoader } from './Pages/ProductEditPage';
import { loader as deleteProductLoader } from './Components/DeleteProduct';
//Cart
import CartPage from './Pages/CartPage';
import { loader as cartLoader } from './Pages/CartPage';
import {loader as deleteCartProductLoader} from './Components/DeleteCartProduct';
import OrderPage from './Pages/OrderPage';
import {action as orderAction} from './Components/Order';
import PaymentPage from './Pages/PaymentPage';
import {loader as paymentLoader} from './Pages/PaymentPage';
import { action as paymentAction } from './Components/Payment';

import OrderHistoryPage from './Pages/OrderHistoryPage';
import {loader as orderHistoryLoader} from './Pages/OrderHistoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoder,
    
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
      action: loginAction
    },
    {
      path: 'signup',
      element: <SignupPage />, 
      action: signupAction
      
    },
    {
      path: 'welcome',
      element: <WelcomePage />,
      loader: checkAuthLoader
    },
    {
      path: 'userlist',
      element: <UserListPage />,
      loader: userListLoader,
      action: deleteUser
    },
    {
      path: 'deleteuser/:id',
      element: <deleteUser />,
      loader: deleteUser
    },
    {
       path: 'edituser/:id',
       element: <EditUserPage/>,
       loader: userLoader,
       action: signupAction
    },
    {
      path: 'logout',
      action: logoutAction
    },
    {
      path: 'categories',
      element: <CategoriesPage/>,
      action: categoryAction
    },
    {
      path: 'categorylist',
      element: <CategoryListPage/>,
      loader: categoryListLoader
    },
    {
       path: 'editcategory/:id',
       element: <CategoryEditPage/>,
       loader: categoryEditLoader,
       action: categoryAction
    },{
      path: 'deletecategory/:id',
      element: <deleteCategory />,
      loader: deleteCategoryLoader
    }, {
      path: 'products',
      element: <ProdcutPage/>,
      action: productAction,
      loader: catLoader
    },
    {
      path: 'productlist',
      element: <ProductListPage/>,
      loader: productListLoader
    },
    {
       path: 'editproduct/:id',
       element: <ProductEditPage/>,
       loader: productEditLoader,
       action: productAction
    },{
      path: 'deleteproduct/:id',
      loader: deleteProductLoader
    },
    {
      path: 'addToCart/:id',
      element: <CartPage/>,
      loader: cartLoader
    }
    ,
    {
      path: 'cartList',
      element: <CartPage/>,
      loader: cartLoader
    },{
      
      path: 'deleteCartProduct/:id',
      loader: deleteCartProductLoader
    },
    {
      path: 'order',
      element: <OrderPage />,
      action: orderAction
    },
    {
      path: 'payment/:totalPrice',
      element: <PaymentPage />,
      loader: paymentLoader,
      action: paymentAction
     
    },
    {
      path: 'orderhistorylist',
      element: <OrderHistoryPage/>,
      loader: orderHistoryLoader
    }
     


  
  
  ]}])


function App() {
  return <RouterProvider router={router} />  
}

export default App;
