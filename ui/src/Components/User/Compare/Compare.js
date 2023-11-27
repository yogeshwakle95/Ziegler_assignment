import React from 'react';
import UserNav from '../UserNav/UserNav';
import Header from '../UserNav/Header';
import Footer from '../Footer/Footer';

const Compare = ({ compare }) => {

  const handleRemoveItem = (product) => {
    // Remove the item from the cart state
    const updatedCart = compare.filter((compareItem) => compareItem !== product);
    // Update the cart in localStorage
    localStorage.setItem('compare', JSON.stringify(updatedCart));
    alert("Product removed");
    window.location.reload();
  };
  
  return (
    <div>
      {/* <UserNav /> */}
      <Header />
      <div className="container mt-3">
        <h1 className='flex items-center justify-center my-5 font-bold'>Compare Products</h1>
        {compare.length === 0 ? (
          <p className="text-center">Your compare is empty.</p>
        ) : (
          <div className="">
            <table className="">
              {/* <thead className=""> */}
                <tr className='block float-left'>
                  <th className='border-solid border-2 flex items-center justify-center'>Product Title</th>
                  <th className='border-solid border-2 h-[150px] flex items-center justify-center'>Image</th>
                  <th className='border-solid border-2 flex items-center justify-center'>Price</th>
                  <th className='border-solid border-2 flex items-center justify-center'>Price After Discount</th>
                  <th className='border-solid border-2 flex items-center justify-center'>Discount</th>
                  {/* <th className=' border-solid border-2 h-[300px] flex items-center justify-center'>Description</th> */}
                  
                  <th className='border-solid border-2 h-[100px] flex items-center justify-center'>Remove</th>
                </tr>
              
                {compare.map((product, index) => (
                  <tr key={index} className='float-left block' >
                    <td className=' border-solid border-2 flex items-center justify-center'>{product.title}</td>
                    <td className='border-solid border-2 h-[150px] w-[430px]  flex items-center justify-center'>
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.title}
                        className=''
                        style={{ width: '100px' }}
                      />
                    </td>
                    <td className='border-solid border-2 flex items-center justify-center'>{product.price}/-</td>
                    <td className='border-solid border-2 flex items-center justify-center'>{product.priceAfterDiscount}/-</td>
                    <td className='border-solid border-2 flex items-center justify-center'>{product.Discount}%</td>
                    {/* <td className=' border-solid border-2 h-[300px] w-[430px] flex'>{product.description}</td> */}
                    
                    <td className='text-danger border-solid border-2 flex items-center justify-center h-[100px]'>
                      <button className="btn btn-danger" onClick={() => handleRemoveItem(product)}>Remove</button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Compare;
