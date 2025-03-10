"use client";
import useStore from "@/store/useStore";
import { useRef, useState } from "react";

export default function Ranks() {
    const { historyRank, addRank, updateRank, deleteRank, selectRank } = useStore();
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
        <div>
            {historyRank && historyRank.length > 0 ? (
                historyRank.map((rank) => (
                    <div key={rank.rankId}>
                        <div onClick={() => openUpdateForm(rank.rankId)}>
                            <div>{rank.startingDate}</div>
                            <div>{rank.rank}</div>
                        </div>
                        <button onClick={() => deleteRank(rank.rankId)}>Delete rank</button>
                    </div>
                ))
            ) : (
                <div>No ranks</div>
            )}

            {updateForm && (
                <form onSubmit={handleUpdate}>
                    <label>Updated starting date: </label>
                    <input ref={newStartingDate} type="date" />
                    <label>Updated rank:</label>
                    <input ref={newRank} type="text" />
                    <button type="submit">Confirm</button>
                </form>
            )}

            <input ref={startingDate} type="date" />
            <input ref={rank} placeholder="Type rank here ..." type="text" />
            <button
                onClick={() => {
                    addRank({ startingDate: startingDate.current.value, rank: rank.current.value });
                }}
            >
                Add rank
            </button>
        </div>
    );
}
