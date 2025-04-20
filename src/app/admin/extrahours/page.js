"use client";

import { useState, useEffect } from 'react';
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";
import ExtraHoursSheet from '@/components/ExtraHoursSheet';

export default function ExtraHours() {
  const { teachers, getSubPeriods } = useStore();
  const router = useRouter();
  
  // États pour la gestion des données
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [academicYear, setAcademicYear] = useState('');
  const [subPeriods, setSubPeriods] = useState([]);
  const [selectedSubPeriod, setSelectedSubPeriod] = useState('');

  // Générer les 10 dernières années académiques
  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i;
    return `${year}/${year + 1}`;
  });

  // Récupérer les sous-périodes quand un enseignant et une année sont sélectionnés
  const fetchSubPeriods = async () => {
    if (!selectedTeacher || !academicYear) return;
    const periods = await getSubPeriods(selectedTeacher.teacher_id, academicYear);
    setSubPeriods(periods);
  };

  // Effet pour charger les sous-périodes quand les sélections changent
  useEffect(() => {
    fetchSubPeriods();
  }, [selectedTeacher, academicYear]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion des Heures Supplémentaires</h1>
      
      {/* Liste des enseignants */}
      <div className="mb-6">
        <h2 className="font-medium mb-2">Sélectionnez un enseignant</h2>
        {teachers?.length > 0 ? (
          <div className="border rounded max-h-60 overflow-y-auto">
            {teachers.map(teacher => (
              <div 
                key={teacher.teacher_id}
                onClick={() => setSelectedTeacher(teacher)}
                className={`p-3 hover:bg-gray-100 cursor-pointer ${
                  selectedTeacher?.teacher_id === teacher.teacher_id ? 'bg-blue-200' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {teacher.picture && (
                    <img 
                      src={teacher.picture} 
                      alt={teacher.first_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{teacher.first_name} {teacher.family_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun enseignant disponible</p>
        )}
      </div>

      {/* Sélection de l'année académique */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Année Académique</label>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={!selectedTeacher}
        >
          <option value="">Sélectionnez une année</option>
          {academicYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Sélection de la sous-période */}
      {subPeriods?.length > 0 && (
        <div className="mb-6">
          <label className="block mb-2 font-medium">Sous-Période</label>
          <select
            value={selectedSubPeriod}
            onChange={(e) => setSelectedSubPeriod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Sélectionnez une sous-période</option>
            {subPeriods.map((period, index) => (
              <option 
                key={`${period.from}-${period.to}`} 
                value={index}
              >
                Du {period.from} au {period.to}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Bouton Générer (pour l'instant non fonctionnel) */}
      <button
        className={`bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 ${
          !selectedSubPeriod ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!selectedSubPeriod}
      >
        Générer la page
      </button>

      {/* Affichage des sélections pour debug */}
      <div className="mt-8 p-4 bg-gray-50 rounded">
        <h2 className="font-bold mb-2">Debug Info:</h2>
        <p>Enseignant sélectionné: {selectedTeacher ? `${selectedTeacher.first_name} ${selectedTeacher.family_name}` : 'Aucun'}</p>
        <p>Année académique: {academicYear || 'Non sélectionnée'}</p>
        <p>Sous-période sélectionnée: {selectedSubPeriod ? subPeriods[selectedSubPeriod].from + ' - ' + subPeriods[selectedSubPeriod].to : 'Aucune'}</p>
      </div>
      <ExtraHoursSheet />
    </div>
  );
}