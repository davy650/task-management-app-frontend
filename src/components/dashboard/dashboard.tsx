"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/use-auth";
import { LucideLogOut, LucidePlus } from "lucide-react";
import { TaskColumn } from "@/components/ui/task-column";
import { CreateTaskModal } from "@/components/ui/create-task";

const Dashboard: React.FC = () => {
  const { token, logout, user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = tasks.filter(task =>
      task.title.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term) || 
      (users.find(u => u.id === task.assignedTo)?.username.toLowerCase().includes(term))
    );
    console.log(results);
    setFilteredTasks(results);
  }, [searchTerm, tasks, users]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const tasksData = await tasksResponse.json();
      setTasks(tasksData);

      const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersResponse.json();
      setUsers(usersData);

    } catch (error) {
      console.error('Failed to fetch data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (taskId: string, newStatus: string) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate || taskToUpdate.status === newStatus) return;

    const updatedTask = { ...taskToUpdate, status: newStatus };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/Tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
      });
      if (!response.ok) {
        throw new Error('Failed to update task status.');
      }
      const data = await response.json();
      setTasks(prevTasks => prevTasks.map(t => (t.id === taskId ? data : t)));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleTaskCreated = (newTask: any) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask: any) => {
    setTasks(prevTasks => prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };
  
  const handleTaskDelete = (deletedTaskId: string) => {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== deletedTaskId));
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading tasks...</div>;
  }

  const todoTasks = filteredTasks.filter(t => t.status === 'TODO');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'INPROGRESS');
  const doneTasks = filteredTasks.filter(t => t.status === 'DONE');

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-md transition-colors flex items-center"
          >
            <LucidePlus size={20} className="mr-2" />
            New Task
          </button>
          <button
            onClick={logout}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LucideLogOut size={24} />
          </button>
        </div>
      </header>

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <TaskColumn status="Todo" tasks={todoTasks} onDrop={handleDrop} users={users} onDelete={handleTaskDelete} />
        <TaskColumn status="InProgress" tasks={inProgressTasks} onDrop={handleDrop} users={users} onDelete={handleTaskDelete}  />
        <TaskColumn status="Done" tasks={doneTasks} onDrop={handleDrop} users={users} onDelete={handleTaskDelete} />
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
        users={users}
      />
    </div>
  );
};

export { Dashboard }