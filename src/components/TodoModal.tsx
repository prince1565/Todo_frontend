/** @format */

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Todo } from "../types/todo";

type Mode = "create" | "edit" | "view";

interface Props {
  mode: Mode;
  isOpen: boolean;
  todo?: Todo;
  onClose: () => void;
  onSubmit?: (todo: Omit<Todo, "_id" | "createdAt" | "user">) => void;
  onUpdate?: (todo: Todo) => void;
}

const TodoModal: React.FC<Props> = ({
  mode,
  isOpen,
  todo,
  onClose,
  onSubmit,
  onUpdate,
}) => {
  const isReadOnly = mode === "view";
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );

  useEffect(() => {
    if (todo && (mode === "edit" || mode === "view")) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setStatus(todo.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [todo, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add validation
    if (!title) {
      alert("Title is required");
      return;
    }

    const todoData = {
      title,
      description: description || "", // Ensure description exists
      status: status || "pending", // Default status
    };

    try {
      if (mode === "create" && onSubmit) {
        await onSubmit(todoData); // Make sure to await
        onClose(); // Close modal on success
      }

      if (mode === "edit" && onUpdate && todo) {
        await onUpdate({ ...todo, ...todoData });
        onClose();
      }
    } catch (error) {
      console.error("Error saving task:", error);
      // Show error to user
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>
        {mode === "create" && "Create New To-Do"}
        {mode === "edit" && "Edit To-Do"}
        {mode === "view" && "View To-Do"}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={isReadOnly}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={isReadOnly}
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>

            <Input
              type="select"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "pending" | "in-progress" | "completed"
                )
              }
              disabled={isReadOnly}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Input>
          </FormGroup>
          {mode !== "view" && (
            <Button type="submit" color="primary" block>
              {mode === "create" ? "Create" : "Save Changes"}
            </Button>
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TodoModal;
