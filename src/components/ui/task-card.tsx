"use client";
import { useState } from "react";
import { useAuth } from "../auth/use-auth";
import { LucideEdit, LucideTrash2, LucideUser } from "lucide-react";
import { Modal } from "../modal/modal";

const TaskCard: React.FC<{ task: any; onTaskUpdate: (task: any) => void; onTaskDelete: (id: string) => void; users: any[] }> = ({ task, onTaskUpdate, onTaskDelete, users }) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedAssigneeId, setEditedAssigneeId] = useState(task.assignedTo);

  const handleUpdate = async () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
      assignedTo: editedAssigneeId === null ? null : editedAssigneeId
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) {
        throw new Error('Failed to update task.');
      }
      const data = await response.json();
      onTaskUpdate(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }
      onTaskDelete(task.id);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer?.setData('taskId', task.id);
    e.dataTransfer?.setData('taskStatus', task.status);
  };

  console.log(task);
  console.log(users);

  const assignee = users.find(u => u.id === task.assignedTo);

  console.log(assignee);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow duration-200"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-sm truncate">{task.title}</h4>
        <div className="flex space-x-2">
          <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 transition-colors">
            <LucideEdit size={16} />
          </button>
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 transition-colors">
            <LucideTrash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-xs mb-2 break-words">{task.description}</p>
      <div className="flex items-center text-xs text-gray-500">
        <LucideUser size={12} className="mr-1" />
        <span>{assignee ? assignee.username : 'Unassigned'}</span>
      </div>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Task">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assignee</label>
            <select
              value={editedAssigneeId || ''}
              onChange={(e) => setEditedAssigneeId(e.target.value === '' ? null : e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="">Unassigned</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleUpdate}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export { TaskCard }