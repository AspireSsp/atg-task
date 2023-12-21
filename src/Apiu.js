import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import iphone from "./image/iphone.jpg";
import { useParams } from "react-router-dom";

function Apiu(props) {
  
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const params = useParams();
  // const{Id}=params;
  // console.log(Id);
  // const { productId } = useParams();

  const Gotocart = () => {
    navigate("/UpdateProduct");
  };

  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${props.Id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json.products);
        setImages(json.images);
        setLoading(false);
        // console.log(params.Id);
      }
       catch (error) {
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
              <div class="card mb-3">
                <img src={item.thumbnail} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{item.title}</h5>
                  <p class="card-text">
                    {item.description}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </p>
                </div>
              </div>
              
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Apiu;
