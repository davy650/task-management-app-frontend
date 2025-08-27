const Modal: React.FC<{ children: React.ReactNode; isOpen: boolean; onClose: () => void; title: string }> = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 transform transition-all">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors">
            &times;
          </button>
        </div>
        <div className="py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal }