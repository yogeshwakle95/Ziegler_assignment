import React, { useState, useEffect } from 'react';
import UserNav from '../UserNav/UserNav';
import { Link } from 'react-router-dom';
import Header from '../UserNav/Header';
import Footer from '../Footer/Footer';

function Cart({ cart }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(calculateTotal(cart));
  }, [cart]);

  const increment = (item) => {
    item.quantity = (item.quantity || 0) + 1;
    setTotalAmount(calculateTotal(cart));
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setTotalAmount(calculateTotal(cart));
    }
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => (total + (item.priceAfterDiscount || 0) * (item.quantity || 1)), 0);
  };

  // Ensure that each item has a quantity of at least 1
  cart.forEach((item) => {
    if (typeof item.quantity !== 'number' || item.quantity < 1) {
      item.quantity = 1;
    }
  });

  // Function to remove an item from cart and localStorage
  const handleRemoveItem = (item) => {
    // Remove the item from the cart state
    const updatedCart = cart.filter((cartItem) => cartItem !== item);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert("product removed");
    window.location.reload();
  };

  return (
    <div>
      {/* <UserNav /> */}
      <Header />
      <div className="cart container mt-5">
        <h2 className="text-center mb-4 mr-[1000px] text-3xl">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">cart is empty.</p>
        ) : (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt={item.title}
                        style={{ width: '100px' }}
                        className="img-thumbnail"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.priceAfterDiscount.toFixed(2)}</td>
                    <td>{item.Discount}%</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => decrement(item)}>
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-sm btn-success" onClick={() => increment(item)}>
                        +
                      </button>
                    </td>
                    <td>{(item.priceAfterDiscount * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemoveItem(item)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-amount text-end">
              <p className="h4">Total Amount: {totalAmount.toFixed(2)}</p>
              <Link to="/orderdetails">
                <button className="btn btn-primary">Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
