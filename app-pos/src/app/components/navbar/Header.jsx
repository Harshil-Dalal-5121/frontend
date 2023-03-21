import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ sortUp, sortDown }) => {
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="mx-2 py-3">
          Axelor POS
        </Navbar.Brand>

        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title="Sort"
            menuVariant="dark"
          >
            <NavDropdown.Item onClick={sortUp}>By Title up</NavDropdown.Item>
            <NavDropdown.Item onClick={sortDown}>
              By Title down
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Clear</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
