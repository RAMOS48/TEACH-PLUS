"use client";

import useStore from "@/store/useStore";

export default function DeleteTeacher({onClose}) {
    const { deleteTeacher, selectTeacher } = useStore();

    const handleDelete = () => {
        deleteTeacher();
        selectTeacher(null);
        onClose();
    };

    return (
        <div className="flex flex-col items-center p-6 shadow-lg rounded-xl max-w-md mx-auto">
            <div className="text-lg font-semibold text-blue-900 mb-4">
                Are you sure you want to delete this teacher?
            </div>
            <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-800 cursor-pointer transition"
            >
                Confirm
            </button>
        </div>
    );
}
