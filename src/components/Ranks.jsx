"use client";
import useStore from "@/store/useStore";
import { useRef, useState , useEffect } from "react";

export default function Ranks() {
    const { historyRank, getRanks ,  addRank, updateRank, deleteRank, selectRank } = useStore();
    const [updateForm, setUpdateForm] = useState(false);

    const startingDate = useRef("");
    const rank = useRef("");
    const newStartingDate = useRef("");
    const newRank = useRef("");

    

    const openUpdateForm = (rankId) => {
        setUpdateForm(true);
        selectRank(rankId);
    };

    const handleUpdate = (e) => {
        e.preventDefault(); 
        updateRank({
            newStartingDate: newStartingDate.current.value,
            newRank: newRank.current.value,
        });
        setUpdateForm(false);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            {historyRank.length == 0 && <div>no ranks</div>}
            {!updateForm && historyRank.length > 0 && 
                historyRank.map((rank) => (
                    <div key={rank.rankId}  className="p-4 mb-2 bg-white rounded-lg shadow-sm flex justify-between items-center">
                        <div onClick={() => openUpdateForm(rank.rankId)} className="cursor-pointer">
                            <div className="text-gray-700 font-semibold">{rank.startingDate}</div>
                            <div className="text-gray-900 font-bold">{rank.rank}</div>
                        </div>
                        <button 
                            onClick={() => deleteRank()} 
                            className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))
             }


            {updateForm && (
                <form onSubmit={handleUpdate} className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
                    <label className="text-gray-700">Updated starting date:</label>
                    <input ref={newStartingDate} type="date" className="p-2 border rounded-lg" />
                    <label className="text-gray-700">Updated rank:</label>
                    <select ref={newRank}  name="rank"   className="p-2 border rounded-lg w-full mb-2">
            <option value="" disabled>Select rank</option>
            {["MCA","MCB","MAA","MAB","PROFESSOR"].map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Confirm
                    </button>
                </form>
            )}
            
            {!updateForm && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                    <input ref={startingDate} type="date" className="p-2 border rounded-lg w-full mb-2" />
                    <select ref={rank}  name="rank"   className="p-2 border rounded-lg w-full mb-2">
            <option value="" disabled>Select rank</option>
            {["MCA","MCB","MAA","MAB","PROFESSOR"].map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
                    <button
                        onClick={() => {
                            addRank({   startingDate: startingDate.current.value, rank: rank.current.value });
                        }}
                        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 w-full"
                    >
                        Add rank
                    </button>
                </div>
            )}
        </div>
    );
}
