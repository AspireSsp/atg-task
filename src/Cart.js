import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    // Filter out the item to be removed based on its ID
    const updatedCart = data.filter(item => item.id !== itemId);
    
    // Update the cart state with the modified items (without the removed item)
    setData(updatedCart);

    // Update the localStorage with the modified cart items
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myCartProducts = await localStorage.getItem('cartItems');
        const myProducts = JSON.parse(myCartProducts);
        setData(myProducts || []); // Set an empty array if no items are present
        
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div>
        {data.length === 0 ? (
          <h2>Your cart is empty. Please add items.</h2>
        ) : (
          <div className="row row-cols-auto ms-5">
            {data.map(item => (
              <div className="card mb-3" key={item.id}>
                <img src={item.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </p>
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default Cart;
