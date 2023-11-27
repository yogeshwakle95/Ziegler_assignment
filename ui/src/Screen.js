import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Admin_nav from './Components/Admin/Admin_nav/Admin_nav';
import Admin_AddCat from './Components/Admin/Admin_AddCat/Admin_AddCat';
import AdminSubCat from './Components/Admin/Admin_SubCat/AdminSubCat';
import Home from './Components/Home/Home';
import Admin_AddBrand from './Components/Admin/Admin_AddBrand/Admin_AddBrand';
import Addproducts from './Components/Admin/Addproducts/Addproducts';
import ManageCategories from './Components/Admin/ManageCategories/ManageCategories';
import ManageSubCategories from './Components/Admin/ManageSubCategories/ManageSubCategories'
import Manageproducts from './Components/Admin/Manageproducts/Manageproducts';
import ManageBrand from './Components/Admin/ManageBrand/ManageBrand'
import EditProduct from './Components/Admin/Manageproducts/EditProduct';
import EditCategoris from './Components/Admin/ManageCategories/EditCategoris';
import EditSubCategories from './Components/Admin/ManageSubCategories/EditSubCategories';
import EditBrand from './Components/Admin/ManageBrand/EditBrand';
import Addfeatured from './Components/Admin/Addfeatured/Addfeatured';
import ManageFeatured from './Components/Admin/ManageFeatured.js/ManageFeatured';
import EditFeatured from './Components/Admin/ManageFeatured.js/EditFeatured';
import ProductByCategory from './Components/User/ProductByCategory/ProductByCategory';
import ProductByBrand from './Components/User/ProductByBrand/ProductByBrand';
import ProductBySubCat from './Components/User/ProductBySubCat/ProductBySubCat';
import ProductDetails from './Components/User/ProductDetails/ProductDetails';
import Cart from './Components/User/Cart/Cart';
import Compare from './Components/User/Compare/Compare';
import Login from './Components/SignIn/Login';
import SignUp from './Components/SignIn/SignUp';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import Products from './Components/User/Products/Products';
import AdminMessage from './Components/Admin/AdminMessage/AdminMessage';
import UserChat from './Components/User/UserChat/UserChat';
import OrderDetails from './Components/User/OrderDetails/OrderDetails';
import Success from './Components/User/OrderDetails/Success';
import Cancel from './Components/User/OrderDetails/Cancel';
// import UserSidebar from './Components/User/UserSidebar/UserSidebar';

const Screen = () => {
  const [cart, setCart] = useState([]);
  const [compare,setCompare] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToCompare = (product)=>{
    setCompare([...compare,product])
  }

  useEffect(() => {
    // Load the cart from localStorage on app initialization
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromLocalStorage);
  }, []);

  useEffect(() => {
    // Load the cart from localStorage on app initialization
    const compareFromLocalStorage = JSON.parse(localStorage.getItem('compare')) || [];
    setCompare(compareFromLocalStorage);
  }, []);
  const isUserAdmin = localStorage.getItem('role') === 'admin';
//   return (
//     <div>
//       <Router>
//         <Routes>
//              <Route path='/signin' element={<Login />} />
//              <Route path='/signup' element={<SignUp />}/>
//             <Route path='/' element={<Home addToCart={addToCart} addToCompare={addToCompare}/>} />
//             <Route path='/productbycategory/:id' element={<ProductByCategory addToCart={addToCart} addToCompare={addToCompare}/>} />
//             <Route path='/productbybrand/:id' element={<ProductByBrand addToCart={addToCart} addToCompare={addToCompare}/> } />
//             <Route path='/productbysubcat/:id' element={<ProductBySubCat addToCart={addToCart} addToCompare={addToCompare}/> }/>
//             <Route path='/productdetails/:id' element={<ProductDetails addToCart={addToCart} addToCompare={addToCompare}/>} />
//             {/* <Route path="/productdetails/:id"><ProductDetails addToCart={addToCart} /></Route> */}
//             <Route path='/productcart' element={<Cart cart={cart}/>} />
//             <Route path='/productcompare' element={<Compare compare={compare} />} />
//             {/* <Route path="/cart"><Cart cart={cart} /> </Route> */}
//             {/* <Route path='/user' element={<UserSidebar />} /> */}
            
//             <Route path='/admin' element={<Admin_nav />} />
//             <Route path='/admin/addcategory' element={<Admin_AddCat />} />
//             <Route path='/admin/addsubcategory' element={<AdminSubCat />}/>
//             <Route path='/admin/addBrand' element={<Admin_AddBrand />} />
//             <Route path='/admin/addproduct' element={<Addproducts />} />
//             <Route path='/admin/addfeatured' element={<Addfeatured />}/>
//             <Route path='/admin/manageCategories' element={<ManageCategories />}/>
//             <Route path='/admin/manageSubCategories' element={<ManageSubCategories />}/>
//             <Route path='/admin/managebrand' element={<ManageBrand />}/>
//             <Route path='/admin/manageproducts' element={<Manageproducts />} />
//             <Route path='/admin/managefeatured' element={<ManageFeatured />} />
//             <Route path='/edit-product/:id' element={<EditProduct />} />
//             <Route path='/edit-categories/:id' element={<EditCategoris />} />
//             <Route path='/edit-subcategory/:id' element={<EditSubCategories />}/>
//             <Route path='/edit-brand/:id' element={<EditBrand />}/>
//             <Route path='/edit-featured/:id' element={<EditFeatured />}/>
            
//         </Routes>
//       </Router>
//     </div>
//   )
// }

return (
  <div>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Admin Routes (Protected) */}
        {isUserAdmin && (
          <>
            <Route path='/admin' element={<AdminHome />} />
            <Route path='/adminhelp' element={<AdminMessage />} />
            <Route path='/admin/addcategory' element={<Admin_AddCat />} />
            <Route path='/admin/addsubcategory' element={<AdminSubCat />} />
            <Route path='/admin/addBrand' element={<Admin_AddBrand />} />
            <Route path='/admin/addproduct' element={<Addproducts />} />
            <Route path='/admin/addfeatured' element={<Addfeatured />} />
            <Route path='/admin/manageCategories' element={<ManageCategories />} />
            <Route path='/admin/manageSubCategories' element={<ManageSubCategories />} />
            <Route path='/admin/managebrand' element={<ManageBrand />} />
            <Route path='/admin/manageproducts' element={<Manageproducts />} />
            <Route path='/admin/managefeatured' element={<ManageFeatured />} />
            <Route path='/edit-product/:id' element={<EditProduct />} />
            <Route path='/edit-categories/:id' element={<EditCategoris />} />
            <Route path='/edit-subcategory/:id' element={<EditSubCategories />} />
            <Route path='/edit-brand/:id' element={<EditBrand />} />
            <Route path='/edit-featured/:id' element={<EditFeatured />} />
          </>
        )}

        <Route path='/userchat' element={<UserChat />} />
        <Route path='/orderdetails' element={<OrderDetails />} />
        <Route path='/success' element={<Success />}/>
        <Route path='/cancel' element={<Cancel />}/>

        {/* Public and User Routes */}
        <Route path='/' element={<Home addToCart={addToCart} addToCompare={addToCompare} />} />
        <Route path='/allproduct' element={<Products addToCart={addToCart} addToCompare={addToCompare}/>} />
        <Route path='/productbycategory/:id' element={<ProductByCategory addToCart={addToCart} addToCompare={addToCompare} />} />
        <Route path='/productbybrand/:id' element={<ProductByBrand addToCart={addToCart} addToCompare={addToCompare} />} />
        <Route path='/productbysubcat/:id' element={<ProductBySubCat addToCart={addToCart} addToCompare={addToCompare} />} />
        <Route path='/productdetails/:id' element={<ProductDetails addToCart={addToCart} addToCompare={addToCompare} />} />
        <Route path='/productcart' element={<Cart cart={cart} />} />
        <Route path='/productcompare' element={<Compare compare={compare} />} />
      </Routes>
    </Router>
  </div>
);
};

export default Screen
