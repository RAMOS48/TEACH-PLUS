"use client";

import useStore from "@/store/useStore";
import { translations } from "@/app/admin/translate";
export default function DeleteTeacher({onClose}) {
    const { deleteTeacher, selectTeacher } = useStore();

    const handleDelete = () => {
        deleteTeacher();
        selectTeacher(null);
        onClose();
    };

    return (
        <div className="flex flex-col items-center p-6 shadow-lg rounded-xl  w-full mx-auto">
            <div className="text-lg font-semibold text-blue-900 mb-4">
               {translations[0].deleteTeacher.messageDelete}
            </div>
            <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-800 cursor-pointer transition"
            >
                {translations[0].deleteTeacher.buttonDelete}
            </button>
        </div>
    );
}
