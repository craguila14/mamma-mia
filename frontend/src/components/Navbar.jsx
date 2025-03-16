import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/ShoppingCartContext';
import { useAuth } from '../context/AuthContext';
import { Button, Nav, Navbar, Container } from 'react-bootstrap';

const NavbarComponent = () => {
  const { calculateTotal } = useContext(CartContext);
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const setActiveClass = ({ isActive }) => (isActive ? "active" : "notActive");

  const renderLinks = () => (
    <Nav className="me-auto">
      <Nav.Link as={NavLink} className={setActiveClass} to="/" style={{ color: "white" }}>
        🍕 Pizzería Mamma Mia!
      </Nav.Link>
      {currentUser && (
        <>
          <Nav.Link as={NavLink} className={setActiveClass} to="/perfil" style={{ color: "white" }}>
            Mi perfil
          </Nav.Link>
          <Nav.Link as={NavLink} className={setActiveClass} to="/carrito" style={{ color: "white" }}>
            Carrito
          </Nav.Link>
          
        </>
      )}
    </Nav>
  );

  const renderAuthLinks = () => {
    if (!currentUser) {
      return (
        <>
          <Nav.Link as={NavLink} className={setActiveClass} to="/login" style={{ color: "white" }}>
            Iniciar sesión
          </Nav.Link>
          <Nav.Link as={NavLink} className={setActiveClass} to="/registrarse" style={{ color: "white" }}>
            Registrarse
          </Nav.Link>
          <Nav.Link as={NavLink} className={setActiveClass} to="/carrito" style={{ color: "white" }}>
            <span>Total: $ {calculateTotal()}</span> 🛒
          </Nav.Link>
        </>
      );
    }

    return (
      <>
        <Button className="me-2" variant="primary" onClick={() => navigate('/carrito')}>
          Ir a pagar
        </Button>
        <Button variant="secondary" onClick={handleLogout}>
          Cerrar sesión
        </Button>
        <Nav.Link as={NavLink} className={setActiveClass} to="/carrito" style={{ color: "white" }}>
            <span>Total: $ {calculateTotal()}</span> 🛒
          </Nav.Link>
      </>
    );
  };

  return (
    <Navbar bg="info" expand="lg" variant="dark">
      <Container>
        {renderLinks()}
        <Navbar.Collapse className="justify-content-end">
          {renderAuthLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
