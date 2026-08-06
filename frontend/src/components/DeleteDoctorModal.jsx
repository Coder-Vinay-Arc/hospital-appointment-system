function DeleteDoctorModal({ onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">
          Delete Doctor
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this doctor?
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteDoctorModal;