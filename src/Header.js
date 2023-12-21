import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-info"));

  function logout() {
    localStorage.clear();
    navigate("/Register");
  }
  return ( 
    
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">Flipkart</Navbar.Brand>
          <Nav className="me-auto nav-link">
            {localStorage.getItem("user-info") ? (
              <>
                <NavLink to="/">Home </NavLink>
                <NavLink to="/ProductDetail">Product</NavLink>
                <NavLink to="/my-cart">Card</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/Login">login</NavLink>
                <NavLink to="/Register">Register</NavLink>
              </>
            )}
          </Nav>
        

          {localStorage.getItem("user-info") ? (
            <Nav>
              <NavDropdown title={user && user.name}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
