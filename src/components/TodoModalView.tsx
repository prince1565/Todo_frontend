import React from 'react';
import { Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';
import { Todo } from '../../types/todo';

const TodoModalView: React.FC<{ todo: Todo | null; onClose: () => void }> = ({ todo, onClose }) => {
  return (
    <Modal isOpen={!!todo} toggle={onClose}>
      <ModalHeader toggle={onClose}>{todo?.title}</ModalHeader>
      <ModalBody>
        <p><strong>Description:</strong> {todo?.description}</p>
        <p><strong>Status:</strong> <Badge>{todo?.status}</Badge></p>
        <p><strong>Created At:</strong> {todo && new Date(todo.createdAt).toLocaleString()}</p>
        <p><strong>Created By:</strong> {todo?.createdBy}</p>
      </ModalBody>
    </Modal>
  );
};

export default TodoModalView;