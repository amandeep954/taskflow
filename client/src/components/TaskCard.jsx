import React from "react";
import { Col, Card, Badge, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const badgeColor =
    task.priority === "High"
      ? "danger"
      : task.priority === "Medium"
      ? "warning"
      : "success";
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card
        className={`h-100 border-0 shadow-sm ${
          task.status === "Completed" ? "opacity-75" : ""
        }`}
      >
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <Badge bg={badgeColor}>{task.priority}</Badge>
            <div>
              <FaEdit
                className="me-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => onEdit(task)}
              />
              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => onDelete(task._id)}
              />
            </div>
          </div>
          <Card.Title
            className={
              task.status === "Completed"
                ? "text-decoration-line-through text-muted"
                : ""
            }
          >
            {task.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-4">
            {task.description}
          </Card.Text>
          <div className="d-flex justify-content-between pt-3 border-top">
            <span
              className={`fw-bold small ${
                task.status === "Completed" ? "text-success" : "text-warning"
              }`}
            >
              ● {task.status}
            </span>
            <Form.Check
              type="checkbox"
              checked={task.status === "Completed"}
              onChange={() => onToggleStatus(task)}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default TaskCard;
