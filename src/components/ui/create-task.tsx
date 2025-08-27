"use client";
import { useAuth } from "@/components/auth/use-auth";
import { useState } from "react";
import { Modal } from "../modal/modal";

const CreateTaskModal: React.FC<{ isOpen: boolean; onClose: () => void; onTaskCreated: (task: any) => void; users: any[] }> = ({ isOpen, onClose, onTaskCreated, users }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(0);
  const [assignedTo, setAssignedTo] = useState<string | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      priority,
      status: 'Todo',
      assignedTo,
      creatorId: 1 // This will be ignored by the backend, as it uses the JWT claim
    };

    console.log(JSON.stringify(newTask));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) {
        throw new Error('Failed to create task.');
      }
      const data = await response.json();
      onTaskCreated(data);
      onClose();
    } catch (error) {
      console.error('Creation failed:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value, 10))}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Assignee</label>
          <select
            value={assignedTo || ''}
            onChange={(e) => setAssignedTo(e.target.value === '' ? "" : e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          >
            <option value="">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          Create Task
        </button>
      </form>
    </Modal>
  );
};

export { CreateTaskModal }