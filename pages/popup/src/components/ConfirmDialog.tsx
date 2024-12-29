interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ isOpen, onConfirm, onCancel }: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-xl bg-white p-6 text-center shadow-lg">
        <div className="mb-4 text-4xl">🪷</div>
        <h2 className="mb-6 text-xl font-bold">Timer is still running. Are you sure you want to go back and cancel the whole progress?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="rounded-full bg-gray-200 px-8 py-2 font-bold text-gray-700 hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-[#39A2DB] px-8 py-2 font-bold text-white hover:bg-[#769FCD]">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
