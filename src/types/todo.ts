export interface Todo {
  _id: string;        // Changed from 'id' to '_id' (Mongoose uses _id)
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed'; // Changed from 'in progress' to 'in-progress'
  user: string;       // Changed from 'createdBy' to 'user' (matches your backend)
  createdAt: string;
  updatedAt?: string;  // Added optional updatedAt
}