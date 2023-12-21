import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Api() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Gotocart = () => {
    navigate("/AddProduct");
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
          {data.map((item, key) => (
            <>
              <Card
                key={item.id}
                style={{ width: "18rem" }}
                className="me-2 mb-2 "
              >
                <Card.Img variant="top" src={item.thumbnail} />

                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={Gotocart}
                    className="justify-content-center"
                  >
                    Shop Now
                  </Button>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default Api;
