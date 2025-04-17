import React, { type JSX } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export function NavMenu(): JSX.Element {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [toggleAccount, setToggleAccount] = React.useState<boolean>(false);

    const toggleNavbar = (): void => {
      setCollapsed(!collapsed);
    };

    // ToDo: Allow pop up account
    const showAccount = (): void => {
      setToggleAccount(!toggleAccount);
    }

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Artisan Cafe</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light">Account</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-light" to="/order">Order</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
  );
}