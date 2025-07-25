import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Badge, FormGroup, Label, Input, Button } from 'reactstrap';
import { Todo } from '../types/todo';

interface Props {
  todo: Todo | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: Todo['status']) => void;
}

const TodoModalView: React.FC<Props> = ({ todo, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState<Todo['status']>('pending');

  useEffect(() => {
    if (todo) setStatus(todo.status);
  }, [todo]);

  const handleSave = () => {
    if (todo && status !== todo.status) {
      onUpdateStatus(todo.id, status);
      onClose();
    }
  };

  return (
    <Modal isOpen={!!todo} toggle={onClose}>
      <ModalHeader toggle={onClose}>{todo?.title}</ModalHeader>
      <ModalBody>
        <p><strong>Description:</strong> {todo?.description}</p>
        <FormGroup>
          <Label>Status</Label>
          <Input
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value as Todo['status'])}
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </Input>
        </FormGroup>
        <p><strong>Created At:</strong> {todo && new Date(todo.createdAt).toLocaleString()}</p>
        <p><strong>Created By:</strong> {todo?.createdBy}</p>
        <Button color="primary" onClick={handleSave} className="mt-2">Save</Button>
      </ModalBody>
    </Modal>
  );
};

export default TodoModalView;