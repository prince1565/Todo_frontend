import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Todo } from './types//todo';

interface Props {
  isOpen: boolean;
  onCreate: (todo: Omit<Todo, '_id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const TodoModalCreate: React.FC<Props> = ({ isOpen, onCreate, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [user, setUser] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !user) return;
    
    onCreate({ 
      title, 
      description, 
      status, 
      user 
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setStatus('pending');
    setUser('');
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Create New Todo</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input 
              type="textarea" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input 
              type="select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value as typeof status)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>User</Label>
            <Input 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Create
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TodoModalCreate;