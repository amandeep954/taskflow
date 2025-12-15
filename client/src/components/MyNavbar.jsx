import React from "react";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Link import karna zaroori hai

const MyNavbar = ({ user, onOpenProfile, onLogout }) => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm mb-4 px-3">
      <Container fluid>
        {/* Brand Link Logic: Agar user hai to Dashboard, nahi to Home */}
        <Navbar.Brand
          as={Link}
          to={user ? "/dashboard" : "/"}
          className="fw-bold text-primary"
        >
          ⚡ TaskFlow
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            {/* 👇 SMART LOGIC YAHAN HAI 👇 */}

            {user ? (
              // CONDITION 1: Agar User Logged In Hai (Dashboard Wala View)
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="d-flex align-items-center gap-2 border-0"
                >
                  <FaUserCircle size={24} className="text-primary" />
                  <span className="fw-bold">{user.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onOpenProfile}>
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // CONDITION 2: Agar Koi User Nahi Hai (Landing Page Wala View)
              <>
                <Link
                  to="/login"
                  className="btn btn-light fw-medium text-decoration-none"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary rounded-pill px-4 text-decoration-none text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
