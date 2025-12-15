import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaRocket, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import MyNavbar from "../components/MyNavbar"; 

const LandingPage = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-primary mb-3 display-5" />,
      title: "Secure Auth",
      text: "Powered by JWT & Bcrypt. Encrypted & safe.",
    },
    {
      icon: <FaRocket className="text-success mb-3 display-5" />,
      title: "Fast CRUD",
      text: "Create, Read, Update, and Delete instantly.",
    },
    {
      icon: <FaMobileAlt className="text-warning mb-3 display-5" />,
      title: "Responsive",
      text: "Works on Mobile, Tablet, and Desktop.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 👇 SMART NAVBAR (Yahan user null rahega, to Login/Signup dikhega) */}
      <MyNavbar />

      {/* Hero Section */}
      <Container className="text-center py-5 flex-grow-1">
        <Row className="justify-content-center mb-5">
          <Col md={8} className="mt-4">
            <span className="badge bg-light text-primary mb-3 border">
              🚀 Frontend Assignment
            </span>
            <h1 className="display-4 fw-bold mb-3">
              Organize work,{" "}
              <span className="text-primary">Unleash potential.</span>
            </h1>
            <p className="lead text-secondary mb-4">
              Simple, secure, and scalable task management dashboard.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/signup"
                className="btn btn-primary btn-lg rounded-pill px-5 shadow"
              >
                Start Free
              </Link>
              <Link
                to="/login"
                className="btn btn-outline-secondary btn-lg rounded-pill px-5"
              >
                View Demo
              </Link>
            </div>
          </Col>
        </Row>

        {/* Features */}
        <Row className="g-4 mt-3">
          {features.map((item, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 border-0 shadow-sm p-3">
                <Card.Body>
                  {item.icon}
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {item.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default LandingPage;
