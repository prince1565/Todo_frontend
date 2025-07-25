/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { io, Socket } from "socket.io-client";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { Todo } from "../types/todo";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { API_BASE_URL } from "../config";

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token, userId, logout } = useAuth();
  const navigate = useNavigate();

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!token) return;

    const newSocket = io(API_BASE_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  // Socket.IO event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("task:created", (task: Todo) => {
      setTodos((prev) => [task, ...prev]);
    });

    socket.on("task:updated", (task: Todo) => {
      setTodos((prev) => prev.map((t) => (t._id === task._id ? task : t)));
    });

    socket.on("task:deleted", ({ taskId }: { taskId: string }) => {
      setTodos((prev) => prev.filter((t) => t._id !== taskId));
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [socket]);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
          headers: {
            "x-auth-token": token || "",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem("token"); // Clear the expired token
            navigate("/login", { replace: true }); // Redirect to login page
            return;
          }
          throw new Error("Failed to fetch task");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (token) fetchTodos();
  }, [token]);

  const handleCreate = async (
    todo: Omit<Todo, "_id" | "createdAt" | "user">
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({
          ...todo,
          // Add any additional required fields here
          status: todo.status || "pending", // Ensure status is always provided
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("token"); // Clear the expired token
          navigate("/login", { replace: true }); // Redirect to login page
          return;
        }
        throw new Error("Failed to create task");
      }

      // Socket.IO will handle the update via the 'task:created' event
      setModalMode(null);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdate = async (updated: Todo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${updated._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({
          title: updated.title,
          description: updated.description,
          status: updated.status,
        }),
      });

      if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token'); // Clear the expired token
        navigate('/login', { replace: true }); // Redirect to login page
        return;
      }
      throw new Error("Failed to Update task");
    }

      // Socket.IO will handle the update via the 'task:updated' event
      setModalMode(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token || "",
        },
      });

      if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token'); // Clear the expired token
        navigate('/login', { replace: true }); // Redirect to login page
        return;
      }
      throw new Error("Failed to delete task");
    }

      // Socket.IO will handle the update via the 'task:deleted' event
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const groupedTodos = todos.reduce((acc: Record<string, Todo[]>, todo) => {
    const date = new Date(todo.createdAt).toDateString();
    acc[date] = acc[date] || [];
    acc[date].push(todo);
    return acc;
  }, {});

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <Row
        className="align-items-center m-0 shadow-sm"
        style={{ position: "relative", zIndex: 1000 }}
      >
        <Col
          md={2}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#9eacf7", height: "70px" }}
        >
          <h5 className="mb-0 text-white fw-bold">Todo List App</h5>
        </Col>
        <Col
          xs={12}
          md={10}
          className="d-flex justify-content-end align-items-center px-3"
          style={{ backgroundColor: "#fff", height: "70px" }}
        >
          <Button
            className="d-md-none me-auto"
            color="primary"
            onClick={() => setShowSidebar(true)}
          >
            {(FaBars as IconType)({ style: { marginBottom: "3px" } })}
          </Button>
          <Button
            color="link"
            onClick={handleLogout}
            className="d-flex align-items-center p-0"
            style={{ color: "#000", textDecoration: "none", height: "45px" }}
          >
            {(FaSignOutAlt as IconType)({
              style: {
                fontSize: "20px",
                marginTop: "4px",
                width: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            })}
            <span
              className="d-none d-md-inline"
              style={{ fontSize: "1.15rem" }}
            >
              Logout
            </span>
          </Button>
        </Col>
      </Row>

      <Row className="m-0">
        {/* Sidebar */}
        <Col
          md={2}
          className="d-none d-md-block p-0"
          style={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#f0f4ff",
          }}
        >
          <div
            className="p-3 border-bottom"
            style={{ backgroundColor: "#f0f4ff" }}
          >
            <p className="mb-0 text-black fw-bold">Todos by Date</p>
          </div>
          <div className="p-3">
            <ListGroup flush>
              {Object.entries(groupedTodos).map(([date, todos]) => (
                <div key={date} className="mb-3">
                  <h6 className="text-primary fw-bold">{date}</h6>
                  {todos.map((todo) => (
                    <ListGroupItem
                      key={todo._id}
                      action
                      onClick={() => {
                        setActiveTodo(todo);
                        setModalMode("view");
                      }}
                      className="rounded shadow-sm mb-1"
                    >
                      {todo.title}
                    </ListGroupItem>
                  ))}
                </div>
              ))}
            </ListGroup>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>To-Do Dashboard</h2>
            <Button color="success" onClick={() => setModalMode("create")}>
              Create To-Do
            </Button>
          </div>
          <TodoList
            todos={todos}
            onEdit={(todo) => {
              setActiveTodo(todo);
              setModalMode("edit");
            }}
            onDelete={handleDelete}
            onView={(todo) => {
              setActiveTodo(todo);
              setModalMode("view");
            }}
          />
        </Col>
      </Row>

      {/* Mobile Sidebar */}
      <Offcanvas
        isOpen={showSidebar}
        toggle={() => setShowSidebar(false)}
        direction="start"
      >
        <OffcanvasHeader toggle={() => setShowSidebar(false)}>
          Todo List App
        </OffcanvasHeader>
        <OffcanvasBody>
          <ListGroup flush>
            {Object.entries(groupedTodos).map(([date, todos]) => (
              <div key={date} className="mb-3">
                <h6 className="text-primary fw-bold">{date}</h6>
                {todos.map((todo) => (
                  <ListGroupItem
                    key={todo._id}
                    action
                    onClick={() => {
                      setActiveTodo(todo);
                      setModalMode("view");
                      setShowSidebar(false);
                    }}
                    className="rounded shadow-sm mb-1"
                  >
                    {todo.title}
                  </ListGroupItem>
                ))}
              </div>
            ))}
          </ListGroup>
        </OffcanvasBody>
      </Offcanvas>

      {/* Todo Modal */}
      <TodoModal
        mode={modalMode || "view"}
        isOpen={modalMode !== null}
        todo={activeTodo || undefined}
        onClose={() => {
          setModalMode(null);
          setActiveTodo(null);
        }}
        onSubmit={handleCreate}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

export default Dashboard;
