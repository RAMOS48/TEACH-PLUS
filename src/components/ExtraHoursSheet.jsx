// components/HeuresSupplementaires.js
export default function ExtraHoursSheet() {
    return (
      <div className="p-6">
        <h1 className="text-center text-lg font-bold mb-4">
          République Algérienne Démocratique et Populaire<br />
          Ministère de l’Enseignement Supérieur et de la Recherche Scientifique
        </h1>
  
        <h2 className="text-center text-md font-semibold mb-2">
          École Supérieure en Informatique 08 Mai 1945 - Sidi Bel Abbès
        </h2>
  
        <div className="mb-4">
          <p>Nom et prénom : ________________________</p>
          <p>Spécialité : ____________________________</p>
          <p>Grade : _________________________________</p>
          <p>Année universitaire : 2024/2025</p>
        </div>
  
        <table className="table-auto w-full border border-black text-sm">
          <thead>
            <tr>
              <th className="border border-black p-1">Mois</th>
              <th className="border border-black p-1">Module</th>
              <th className="border border-black p-1">Heures</th>
              <th className="border border-black p-1">Dates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1" rowSpan={5}>Octobre</td>
              <td className="border border-black p-1">Module 1</td>
              <td className="border border-black p-1">11h</td>
              <td className="border border-black p-1">03, 10</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Module 2</td>
              <td className="border border-black p-1">12h</td>
              <td className="border border-black p-1">17, 25</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Module 3</td>
              <td className="border border-black p-1">12h</td>
              <td className="border border-black p-1">18, 24</td>
            </tr>
            <tr>
              <td className="border border-black p-1">Module 4</td>
              <td className="border border-black p-1">12h</td>
              <td className="border border-black p-1">31, 28</td>
            </tr>
            <tr>
              <td className="border border-black p-1 font-bold">Total Octobre</td>
              <td className="border border-black p-1 font-bold">59h</td>
              <td className="border border-black p-1"></td>
            </tr>
  
            {/* Répéter les blocs similaires pour Novembre et Décembre */}
  
            <tr>
              <td className="border border-black p-1 font-bold" colSpan={2}>Total général</td>
              <td className="border border-black p-1 font-bold">144h</td>
              <td className="border border-black p-1"></td>
            </tr>
          </tbody>
        </table>
  
        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p>Le Directeur des Études</p>
            <br /><br />
            <p>_________________</p>
          </div>
          <div>
            <p>Les enseignants concernés</p>
            <br /><br />
            <p>_________________</p>
          </div>
          <div>
            <p>Le Directeur</p>
            <br /><br />
            <p>_________________</p>
          </div>
        </div>
      </div>
    );
  }
  