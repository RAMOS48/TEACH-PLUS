import { useState } from "react";
import useStore from "@/store/useStore";
export default function AddSession({ onClose }) {
  const [sessionData, setSessionData] = useState({
    day: "",
    start_hour: "",
    duration: "",
    type: "",
    module: "",
    classroom: "",
    group: "",
  });

  const handleChange = (e) => {
    setSessionData({ ...sessionData, [e.target.name]: e.target.value });
  };
const { addSession }= useStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    addSession(sessionData); 
    setSessionData({ day: "", start_hour: "", duration: "", type: "", module: "", classroom: "", group: "" });
    onClose();
};

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter une session</h2>
    
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-600">Jour</label>
        <select
          name="day"
          value={sessionData.day}
          onChange={handleChange}
          className="w-full p-2 border rounded">
          <option value="">Sélectionnez un jour</option>
          {["dim", "lun", "mar", "mer", "jeu", "ven", "sam"].map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Heure de début</label>
        <input
          type="time"
          name="start_hour"
          value={sessionData.start_hour}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Durée (minutes)</label>
        <input
          type="number"
          name="duration"
          value={sessionData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Type</label>
        <select
          name="type"
          value={sessionData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded">
          <option value="">Sélectionnez un type</option>
          <option value="CM">CM</option>
          <option value="TD">TD</option>
          <option value="TP">TP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Module</label>
        <input
          type="text"
          name="module"
          value={sessionData.module}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Salle</label>
        <input
          type="text"
          name="classroom"
          value={sessionData.classroom}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-600">Groupe</label>
        <input
          type="text"
          name="group"
          value={sessionData.group}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Confirmer
        </button>
      </div>

    </form>
  </div>
  );
}
