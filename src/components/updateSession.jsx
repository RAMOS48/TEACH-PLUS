import useStore from "@/store/useStore";
import { useState, useEffect } from "react";

export default function UpdateSession({ session , onClose}) {
  const [updatedSession, setUpdatedSession] = useState({ ...session });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setUpdatedSession({ ...session });
    setIsModified(false);
  }, [session]);
const { updateSession , deleteSession} =useStore();
  const handleChange = (e) => {
    setUpdatedSession({ ...updatedSession, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();  
    updateSession(updatedSession);
    setIsModified(false);
  };
  const handleDelete = () => {
    deleteSession(updatedSession.sessionId);
    setIsModified(false);
    onClose();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Modifier la session</h2>

      {/* Formulaire */}
      <form className="grid grid-cols-2 gap-4">
        {/* Sélection du jour */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Jour</label>
          <select
            name="day"
            value={updatedSession.day}
            onChange={handleChange}
            className="w-full p-2 border rounded">
            {["dim", "lun", "mar", "mer", "jeu", "ven", "sam"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Heure de début */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Heure de début</label>
          <input
            type="time"
            name="start_hour"
            value={updatedSession.start_hour}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Durée (minutes)</label>
          <input
            type="number"
            name="duration"
            value={updatedSession.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Type de session */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select
            name="type"
            value={updatedSession.type}
            onChange={handleChange}
            className="w-full p-2 border rounded">
            <option value="CM">CM</option>
            <option value="TD">TD</option>
            <option value="TP">TP</option>
          </select>
        </div>

        {/* Module */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Module</label>
          <input
            type="text"
            name="module"
            value={updatedSession.module}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Salle */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Salle</label>
          <input
            type="text"
            name="classroom"
            value={updatedSession.classroom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Groupe */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Groupe</label>
          <input
            type="text"
            name="group"
            value={updatedSession.group}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Boutons Modifier & Supprimer */}
        <div className="col-span-2 flex justify-between mt-4">
          {/* Bouton Modifier (Désactivé si aucun changement) */}
          <button
            type="submit"
            onClick={handleUpdate}
            disabled={!isModified}
            className={`px-6 py-2 rounded text-white transition 
              ${isModified ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}>
            Modifier
          </button>

          {/* Bouton Supprimer */}
          <button
            type="button"
            onClick={() => handleDelete()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition">
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
}
