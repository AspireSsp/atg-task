import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import iphone from "./image/iphone.jpg";
// import { useParams } from "react-router-dom";


function Appi(props) {
  const [productId,setProductId]=useState(""); 

  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



    const handleAddToCart = (Id) => {
      // props.setProductId=(Id)
    // Implement adding to cart logic here
    console.log('Adding product with id', Id, 'to cart');
    // console.log('Adding product with id', productId, 'to cart');
    navigate(`/UpdateProduct/:${Id}`);
   
  };



  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json.products);
        setImages(json.images);
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
    <div>
      {data && (
        <div className="row row-cols-auto ms-5">
          {data.map((item) => (
            <>
              <div className="container ">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.thumbnail}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title">{item.brand}</h4>
                        <h5 className="card-title">{item.title}</h5>
                        <h5 className="card-Price">₹{item.price}</h5>
                        <h6 className="card-dis">Discount {item.discountPercentage}%</h6>
                        <h5 className="card-Price">Stock Available {item.stock}</h5>
                        <p className="card-text">
                         {item.description}
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Last updated 3 mins ago
                          </small>
                        </p>
                        <Button onClick={() => handleAddToCart(item.id)}>Add to Cart </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appi;


