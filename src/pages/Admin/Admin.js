import React from 'react';
import { Link, NavLink, Outlet, Route, useLocation, Routes} from "react-router-dom";
import "./Admin.css";
import AllProduct from './AllProduct';
import Accounts from './Accounts';
import AddProducts from './AddProducts';
import Dashboard from './Dashboard';

const Admin = () => {

  const Outlet = () => {
    return (
        <Routes>
            <Route path='/admin/all-products' element={AllProduct}></Route>
            <Route path='/admin/accounts' element={Accounts}></Route>
            <Route path='/admin/add-products' element={AddProducts}></Route>
            <Route path='/admin/dashboard' element={Dashboard}></Route>
        </Routes>
    )
  }  

  return (
    <div className='admin'>
        {/* <p>hellop</p> */}
        <div className='content'>
            <div className='nav'>
                <div className='logo'>
                    <h1>Product Admin</h1>
                </div>
                <div className='menu'>
                    <ul>
                        <Link to={'/admin/dashboard'}>
                            <li>
                                Dashboard
                            </li>
                        </Link>
                        <Link to={"/admin/all-products"}>
                            <li>
                                Products
                            </li>
                        </Link>
                        <Link to={'/admin/accounts'}>
                            <li>
                                Accounts
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className='greeding'>
                    <p>Xin chào, Admin!</p>
                    <Link to={'/SignIn'}>
                        <button>Đăng xuất</button>
                    </Link>
                </div>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin