import React, { useEffect, useState } from 'react';
import Header from '../UserNav/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [details,setDetails] = useState('');
  const [phone,setPhone] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [selectMode,setSelectedMode] = useState('');

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setOrderData(cartFromLocalStorage);
    const quantityArray = cartFromLocalStorage.map(item => setQuantity(item.quantity));
    const product = cartFromLocalStorage.map(item => setTitle(item.title));
    const totalPrice = cartFromLocalStorage.reduce((acc, item) => acc + item.priceAfterDiscount, 0);
    setPrice(totalPrice);
    // Assuming you have a way to get the userId, update setUserIdInput accordingly
    setUserIdInput(localStorage.getItem('userId') || '');
  }, []);
  // console.log(selectMode);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to represent the order data
    const orderData = {
      userId: userIdInput,
      product: title,
      quantity: quantity,
      price: price,
      shippingdetails: details,
      phone: phone,
      city: city,
      postalCode: postalCode,
      totalOrderPrice: price,
      // paymentMethodType: selectMode,
      isPaid: true, // Assuming it's paid by default
    };

    try {
      // Make a POST request to the server
      const response = await axios.post('http://localhost:8000/api/orders', orderData);

      // Handle the response as needed
      console.log('Order placed successfully:', response.data);

      // You might want to redirect or perform other actions here
    } catch (error) {
      // Handle errors
      console.error('Error placing order:', error);
    }

    const stripe = await loadStripe("pk_test_51OGfJvSJspMrl1Kwmd6Epvcgf385T2BKPKB24m4z7EFcRMFO1eNLOuW72jVmVVDfVyl9Do1oq8ipwtlLe5BMpNUL00BjPxlHWy");
  //   const body = {
  //     price:price
  // }
  const headers = {
      "Content-Type":"application/json"
  }
  const response = await fetch("http://localhost:8000/api/payment/",{
      method:"POST",
      headers:headers,
      body:JSON.stringify({price})
  });

  const session = await response.json();

  const result = stripe.redirectToCheckout({
      sessionId:session.id
  });
  
  if(result.error){
      console.log(result.error);
  }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <form className="max-w-md mx-auto">
          {/* userId */}
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-600">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>

          {/* cartItems */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Cart Items</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded w-1/2"
                placeholder="Product"
              />
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 border rounded w-1/4"
                placeholder="Quantity"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 border rounded w-1/4"
                placeholder="Price"
              />
            </div>
          </div>

        {/* shippingAddress */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Shipping Address</label>
          <input
            type="text"
            name="shippingAddress.details"
            onChange={(e)=>setDetails(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Details"
          />
          <input
            type="text"
            name="shippingAddress.phone"
            onChange={(e)=>setPhone(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Phone"
          />
          <input
            type="text"
            name="shippingAddress.city"
            onChange={(e)=>setCity(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="City"
          />
          <input
            type="text"
            name="shippingAddress.postalCode"
            onChange={(e)=>setPostalCode(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Postal Code"
          />
        </div>

        {/* Other fields */}
        <div className="mb-4">
          <label htmlFor="totalOrderPrice" className="block text-sm font-medium text-gray-600">
            Total Order Price
          </label>
          <input
            type="number"
            id="totalOrderPrice"
            name="totalOrderPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Total Order Price"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethodType" className="block text-sm font-medium text-gray-600">
            Payment Method Type
          </label>
          <select
            id="paymentMethodType"
            name="paymentMethodType"
            onChange={(e)=>setSelectedMode(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
          Process order
        </button>
      </form>
    </div>
    <Footer />
    </div>
  )
}

export default OrderDetails
