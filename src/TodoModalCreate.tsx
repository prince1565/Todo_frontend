import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Todo } from '../types/todo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const TodoModalCreate: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('pending');
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !createdBy) return;
    onCreate({ title, description, status, createdBy });
    setTitle('');
    setDescription('');
    setStatus('pending');
    setCreatedBy('');
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Create New To-Do</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input type="select" value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Created By</Label>
            <Input value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
          </FormGroup>
          <Button type="submit" color="primary" block>
            Create
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TodoModalCreate;