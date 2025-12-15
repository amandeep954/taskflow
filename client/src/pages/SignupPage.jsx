import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import MyNavbar from "../components/MyNavbar";
import Footer from "../components/Footer";

const SignupPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirm)
      return setError("Passwords do not match!");

    try {
      const res = await api.post("/auth/register", data);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <MyNavbar />

      <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        <Card
          className="shadow-lg border-0 p-4"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <h2 className="text-center mb-4 text-primary fw-bold">
            Create Account
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {["name", "email", "password", "confirm"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Control
                  name={field}
                  type={
                    field.includes("password") || field === "confirm"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={
                    field === "confirm"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  required
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            <Button variant="success" type="submit" className="w-100 fw-bold">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3 small">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </Card>
      </Container>

      <Footer />
    </div>
  );
};

export default SignupPage;
