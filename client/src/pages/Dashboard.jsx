import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "../services/api";

//  Components Import
import MyNavbar from "../components/MyNavbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import ProfileModal from "../components/ProfileModal";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // --- INITIAL LOAD ---
  useEffect(() => {
    fetchTasks();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setProfileData({
        name: savedUser.name,
        email: savedUser.email,
        password: "",
      });
    }
  }, []);

  // --- API FUNCTIONS ---
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) navigate("/login");
      setLoading(false);
    }
  };

  const handleSaveTask = async () => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, newTask);
      } else {
        await api.post("/tasks", newTask);
      }
      setShowTaskModal(false);
      fetchTasks();
    } catch (err) {
      alert("Error saving task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      setTasks(
        tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      fetchTasks();
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await api.put("/auth/profile", profileData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setShowProfileModal(false);
      alert("Profile Updated!");
      setProfileData({ ...profileData, password: "" });
    } catch (err) {
      alert("Error updating profile");
    }
  };

  // 👇 CORRECTED LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      navigate("/"); // ✅ Ab ye Home Page par jayega (Pahle '/login' tha)
    } catch (err) {
      console.log(err);
    }
  };

  // --- HELPER ---
  const openTaskModal = (task = null) => {
    setEditingTask(task);
    setNewTask(
      task ? { ...task } : { title: "", description: "", priority: "Medium" }
    );
    setShowTaskModal(true);
  };

  // --- RENDER ---
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MyNavbar
        user={user}
        onOpenProfile={() => setShowProfileModal(true)}
        onLogout={handleLogout}
      />

      <Container className="flex-grow-1">
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="fw-bold">My Tasks</h2>
          </Col>
          <Col xs="auto">
            <Button
              onClick={() => openTaskModal()}
              className="d-flex align-items-center gap-2"
            >
              <FaPlus /> New Task
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {tasks.length === 0 ? (
              <Col className="text-center mt-5 text-muted">
                <h4>No tasks yet 📭</h4>
              </Col>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={openTaskModal}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
          </Row>
        )}
      </Container>

      <TaskModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        isEditing={!!editingTask}
        task={newTask}
        setTask={setNewTask}
        onSave={handleSaveTask}
      />

      <ProfileModal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        data={profileData}
        setData={setProfileData}
        onUpdate={handleUpdateProfile}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
