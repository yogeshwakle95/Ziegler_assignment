import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();
  const item = localStorage.getItem('role');

  const handleLogout = () => {
    if (item === 'admin') {
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="bg-[#f0ebeb]">
        <div className="container mx-auto flex items-center justify-between p-4">
          <a className="text-black text-xl" href="/admin">
            Admin Ecommerce Panel
          </a>
          <button
            className="lg:hidden text-white focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="block h-6 w-6 border border-white"></span>
          </button>
          <div className="hidden lg:flex lg:items-center lg:ml-auto" id="navbarNav">
            <ul className="flex items-center space-x-4">
              <li>
                <a className="text-black" href="/adminhelp">
                  Custmer Query
                </a>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/addproduct"
                >
                  Products
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black " href="/admin/addproduct">
                      Add Product
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/manageproducts">
                      Manage Products
                    </a>
                  </li>
                </ul>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/addcategory"
                >
                  Categories
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/addcategory">
                      Add Category
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/manageCategories">
                      Manage Categories
                    </a>
                  </li>
                </ul>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/addsubcategory"
                >
                  Sub Categories
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/addsubcategory">
                      Add Subcategory
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/managesubcategories">
                      Manage Subcategories
                    </a>
                  </li>
                </ul>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/addBrand"
                >
                  Brand
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/addbrand">
                      Add Brand
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/managebrand">
                      Manage Brands
                    </a>
                  </li>
                </ul>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/addfeatured"
                >
                  Featured
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/addfeatured">
                      Add Featured
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/managefeatured">
                      Manage Featured
                    </a>
                  </li>
                </ul>
              </li>
              <li className="group">
                <a
                  className="text-black group-hover:bg-primary-dark px-4 py-2 rounded"
                  href="/admin/orders"
                >
                  Orders
                </a>
                <ul className="hidden group-hover:block absolute z-10 bg-[#ffff] drop-shadow-lg">
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/pendingorders">
                      Pending Orders
                    </a>
                  </li>
                  <li>
                    <a className="block px-4 py-2 text-black" href="/admin/completedorders">
                      Completed Orders
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className="text-black"
                  href="/"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="sidebar">
        {/* Sidebar content */}
      </aside>

      {/* Main content area */}
      <main className="main">
        {/* Main content */}
      </main>
    </div>
  );
};

export default AdminNav;
