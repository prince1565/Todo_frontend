import React, { useState } from 'react';
import { Button, Container } from 'reactstrap';
import { Todo } from '../../types/todo';
import TodoList from '../components/TodoList';
import TodoModalView from '../components/TodoModalView';
import TodoModalCreate from '../TodoModalCreate';
import { v4 as uuidv4 } from 'uuid';

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const handleCreate = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setCreateOpen(false);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>To-Do Dashboard</h2>
        <Button color="success" onClick={() => setCreateOpen(true)}>Create To-Do</Button>
      </div>
      <TodoList todos={todos} onSelect={setSelectedTodo} />
      <TodoModalView todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      <TodoModalCreate isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate} />
    </Container>
  );
};

export default Dashboard;