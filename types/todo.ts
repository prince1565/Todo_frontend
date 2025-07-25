export interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in progress' | 'completed';
  createdBy: string;
  createdAt: string;
}
