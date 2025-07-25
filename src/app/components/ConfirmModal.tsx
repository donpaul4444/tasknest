"useclient";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) {

    if(!isOpen)return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >Yes</button>
          <button
          onClick={onClose}
          className="bg-gray-300 text-black dark:bg-gray-700 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}
