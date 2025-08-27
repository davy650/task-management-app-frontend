import { TaskCard } from "./task-card";

const TaskColumn: React.FC<{ 
  status: string; tasks: any[]; 
  onDrop: (taskId: string, newStatus: string) => void; 
  users: any[];
  onDelete: (taskId: string) => void}> = ({ status, tasks, onDrop, users, onDelete }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer?.getData('taskId') || "";
    onDrop(taskId, status);
  };

  const handleDelete = (taskId: string) => {
    onDelete(taskId);
  } 

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo': return 'bg-gray-200';
      case 'InProgress': return 'bg-yellow-200';
      case 'Done': return 'bg-green-200';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div
      className={`flex-1 p-4 rounded-lg min-w-[280px] ${getStatusColor(status)} shadow-md`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">{status.replace(/([A-Z])/g, ' $1').trim()} ({tasks.length})</h3>
      <div className="space-y-4 min-h-[200px]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onTaskUpdate={() => {}} onTaskDelete={handleDelete} users={users} />
        ))}
      </div>
    </div>
  );
};

export { TaskColumn }