import React from 'react';
import { Table, Badge } from 'reactstrap';
import { Todo } from '../types/todo';

const TodoList: React.FC<{ todos: Todo[]; onSelect: (todo: Todo) => void }> = ({ todos, onSelect }) => {
  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Status</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id} onClick={() => onSelect(todo)} style={{ cursor: 'pointer' }}>
            <td>{todo.title}</td>
            <td>{todo.description.slice(0, 30)}...</td>
            <td>{new Date(todo.createdAt).toLocaleString()}</td>
            <td>
              <Badge color={
                todo.status === 'pending' ? 'secondary' :
                todo.status === 'in progress' ? 'warning' : 'success'
              }>
                {todo.status}
              </Badge>
            </td>
            <td>{todo.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TodoList;