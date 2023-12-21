import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail(props) {
  const [productId, setProductId] = useState("");
  const [data, setData] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleAddToCart = async(product) => {
    alert("successfully")
    var allItems = [];
    const myItems = await JSON.parse(localStorage.getItem("cartItems"));
    if(myItems){
      allItems = [...myItems, product];
    }else{
      allItems.push(product);
    }

    const setProduct = await localStorage.setItem("cartItems", JSON.stringify(allItems))
  };


  useEffect(() => {
    // Function to fetch API data
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const res = await response.json();
        setData(res);
        // setImages(json.images);
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
      {/* <Appi /> */}
      <div>
        <div className="row row-cols-auto ms-5">
          <div className="containe">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={data?.thumbnail}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">{data?.brand}</h4>
                    <h5 className="card-title">{data?.title}</h5>
                    <h5 className="card-Price">₹{data?.price}</h5>
                    <h6 className="card-dis">
                      Discount {data?.discountPercentage}%
                    </h6>
                    <h5 className="card-Price">Stock Available {data?.stock}</h5>
                    <p className="card-text">{data?.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                    <Button className="me-3" onClick={() => handleAddToCart(data)}>
                      Add to Cart
                    </Button>
                    <Button onClick={() => {navigate('/my-cart')} }>
                      View Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default ProductDetail;

