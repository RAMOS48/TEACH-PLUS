"use client";

import { useState, useEffect } from 'react';
import useStore from "@/store/useStore";
import { useRouter } from "next/navigation";
import ExtraHoursSheet from '@/components/ExtraHoursSheet';
import Modal from '@/components/Modal';
import { motion } from 'framer-motion';

export default function ExtraHours() {
  const { getExtraHoursSheet, teachers, getSubPeriods } = useStore();
  const router = useRouter();
  
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [academicYear, setAcademicYear] = useState('');
  const [subPeriods, setSubPeriods] = useState([]);
  const [extraDays, setExtraDays] = useState([]);
  const [selectedSubPeriod, setSelectedSubPeriod] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sheet, setSheet] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const academicYears = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear - i;
    return `${year}/${year + 1}`;
  });

  const fetchSubPeriods = async () => {
    if (!selectedTeacher || !academicYear) return;
    setIsLoading(true);
    try {
      const periods = await getSubPeriods(selectedTeacher.teacher_id, academicYear);
      setSubPeriods(periods);
      setSelectedSubPeriod('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtraHours = async () => {
    setIsLoading(true);
    try {
      const sheetData = await getExtraHoursSheet({
        teacherId: selectedTeacher.teacher_id,
        from: subPeriods[selectedSubPeriod].from,
        to: subPeriods[selectedSubPeriod].to,
        rank: subPeriods[selectedSubPeriod].rank,
        academicYear: academicYear,
        rankPrice: 100
      });
      setSheet(sheetData.sheet);
      setExtraDays(sheetData.extraDays);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubPeriods();
  }, [selectedTeacher, academicYear]);

  return (
    <motion.div 
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1 
        className="text-2xl font-bold mb-6 text-[#141F75]"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Gestion des Heures Supplémentaires
      </motion.h1>
      
      {/* Sélection de l'enseignant */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="font-medium mb-2 text-[#141F75]">Sélectionnez un enseignant</h2>
        {teachers?.length > 0 ? (
          <div className=" rounded-lg max-h-60 overflow-y-auto">
            {teachers.map(teacher => (
              <motion.div 
                key={teacher.teacher_id}
                onClick={() => setSelectedTeacher(teacher)}
                className={`p-3 hover:bg-gray-100 cursor-pointer transition-colors ${
                  selectedTeacher?.teacher_id === teacher.teacher_id ? 'bg-blue-100' : ''
                }`}
                whileHover={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  {teacher.picture ? (
                    <img 
                      src={teacher.picture} 
                      alt={teacher.first_name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Photo</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{teacher.first_name} {teacher.family_name}</p>
                    <p className="text-sm text-gray-500">{teacher.rank}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun enseignant disponible</p>
        )}
      </div>

      {/* Sélection de l'année académique */}
      <motion.div 
        className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        transition={{ delay: 0.1 }}
      >
        <label className="block mb-2 font-medium text-[#141F75]">Année Académique</label>
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          disabled={!selectedTeacher || isLoading}
        >
          <option value="">Sélectionnez une année</option>
          {academicYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </motion.div>

      {/* Sélection de la sous-période */}
      {subPeriods?.length > 0 && (
        <motion.div 
          className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <label className="block mb-2 font-medium text-[#141F75]">Sous-Période</label>
          <select
            value={selectedSubPeriod}
            onChange={(e) => setSelectedSubPeriod(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            disabled={isLoading}
          >
            <option value="">Sélectionnez une sous-période</option>
            {subPeriods.map((period, index) => (
              <option 
                key={`${period.from}-${period.to}`} 
                value={index}
              >
                Du {new Date(period.from).toLocaleDateString()} au {new Date(period.to).toLocaleDateString()} - Grade: {period.rank}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Bouton Générer */}
      <div className="flex justify-end">
        <motion.button
          className={`px-6 py-2 rounded-md text-white font-medium ${
            !selectedSubPeriod ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2738BD] hover:bg-[#1e2e9e]'
          }`}
          disabled={!selectedSubPeriod || isLoading}
          onClick={handleExtraHours}
          whileHover={selectedSubPeriod ? { scale: 1.05 } : {}}
          whileTap={selectedSubPeriod ? { scale: 0.95 } : {}}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération...
            </span>
          ) : (
            "Générer la fiche"
          )}
        </motion.button>
      </div>

      {/* Modal pour afficher la fiche */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4"
        >
          <ExtraHoursSheet 
            teacher={{
              rank: sheet.rank,
              extraDays: extraDays,
              firstName: selectedTeacher?.first_name,
              familyName: selectedTeacher?.family_name,
              academicYear: academicYear,
              from: subPeriods[selectedSubPeriod]?.from,
              to: subPeriods[selectedSubPeriod]?.to
            }}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </Modal>
    </motion.div>
  );
}