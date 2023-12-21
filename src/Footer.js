import React from "react";

function Footer() {
  return (
    <>
    
      
    
      <div className="footer-container">
        <footer className="footer">
          <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
              <span className="navbar-brand ms-5 h1 ">Flipkart</span>

              <p className="me-2 text-primary">
                {" "}
                &#169;<span>2023 Copyright : Govardhan</span>
              </p>
              <div className="icon-box">
                <span className="me-4">
                  <i className="bi bi-linkedin"></i>
                </span>
                <span className="me-4">
                  <i className="bi bi-github"></i>
                </span>
                <span className="me-4">
                  <i className="bi bi-facebook"></i>
                </span>
                <span className="me-4">
                  <i className="bi bi-instagram"></i>
                </span>
              </div>
            </div>
          </nav>
        </footer>
      </div>
      
    </>
  );
}

export default Footer;
