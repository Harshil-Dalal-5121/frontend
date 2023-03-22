import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { SortDown, SortUp } from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";

const type = [
  { key: "cardTitle", title: "By Title" },
  { key: "itemPrice", title: "By Price" },
];

const Header = ({ setOrder, clearSort, sort }) => {
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
            {/* <NavDropdown.Item onClick={() => setOrder({ name: "cardTitle" })}>
              By Title{!sort ? <SortAlphaDown /> : <SortAlphaUp />}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setOrder({ name: "itemPrice" })}>
              By Price{!sort ? <SortNumericDown /> : <SortNumericUp />}
            </NavDropdown.Item> */}
            {type.map(({ title, key }) => {
              return (
                <NavDropdown.Item onClick={() => setOrder({ name: { key } })}>
                  {" "}
                  {title}
                  {!sort ? <SortUp /> : <SortDown />}
                </NavDropdown.Item>
              );
            })}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={clearSort}>Clear</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
