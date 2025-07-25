import React from 'react';
import { Table, Badge, Button } from 'reactstrap';
import { Todo } from '../types/todo';

const TodoList: React.FC<{
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onView: (todo: Todo) => void;
}> = ({ todos, onEdit, onDelete, onView }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo._id}>
            <td>{todo.title}</td>
            <td>{todo.description?.slice(0, 30)}...</td>
            <td>{new Date(todo.createdAt).toLocaleString()}</td>
            <td>
              <Badge color={
                todo.status === 'pending' ? 'secondary' :
                todo.status === 'in-progress' ? 'warning' : 'success'
              }>
                {todo.status}
              </Badge>
            </td>
            <td>
              <Button color="info" size="sm" onClick={() => onView(todo)}>View</Button>{' '}
              <Button color="primary" size="sm" onClick={() => onEdit(todo)}>Edit</Button>{' '}
              <Button color="danger" size="sm" onClick={() => onDelete(todo._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoList;