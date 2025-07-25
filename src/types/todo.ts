export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed'; // Note the hyphen
  user: string;
  createdAt: string;
  updatedAt?: string;
}