import camera from "./image/camera.jpg";
import headfon from "./image/headfon.jpg";
import phone from "./image/phone.jpg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

function ProductList() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const Gotocart = (id) => {
    navigate(`/ProductDetail/${id}`);
  };

  useEffect(() => {
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

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  // Filtered products based on the search term
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <div className="all">
        {/* Carousel */}
        <Carousel className="b">
          <Carousel.Item>
            <img className="d-block w-100 " src={phone} alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
             </Carousel.Caption>
           </Carousel.Item>
           <Carousel.Item>
           <img className="d-block w-100" src={headfon} alt="Second slide" />

             <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
             </Carousel.Caption>
         </Carousel.Item>
           <Carousel.Item>
            <img className="d-block w-100" src={camera} alt="Third slide" />

             <Carousel.Caption>
             <h3>Third slide label</h3>
             <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
               </p>
             </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Search input */}
        <Form className="mb-3 mt-3">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>

        {/* Product cards */}
        <div>
          {searchTerm === "" ? (
            <div className="row row-cols-auto ms-5">
              {data.map((item) => (
                <Card key={item.id} style={{ width: "18rem" }} className="me-2 mb-2">
                  <Card.Img variant="top" key={item.id} src={item.thumbnail} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        Gotocart(item.id);
                      }}
                      className="justify-content-center"
                    >
                      Shop Now
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : filteredData.length > 0 ? (
            <div className="row row-cols-auto ms-5">
              {filteredData.map((item) => (
                <Card key={item.id} style={{ width: "18rem" }} className="me-2 mb-2">
                  <Card.Img variant="top" key={item.id} src={item.thumbnail} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        Gotocart(item.id);
                      }}
                      className="justify-content-center"
                    >
                      Shop Now
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ProductList;

