

const isEnglish = ( true );


export const translations = [{
  page: "teachers",
  title: isEnglish ? "Teacher Management Panel" : "Panneau de Gestion des Enseignants",
  subtitle: isEnglish 
    ? "Browse and manage teachers, view profiles, and update information." 
    : "Parcourez et gérez les enseignants, consultez les profils et mettez à jour les informations.",
  searchPlaceholder: isEnglish 
    ? "🔍 Search by name, grade, or status..." 
    : "🔍 Rechercher par nom, grade ou statut...",
  filterOptions: {
    ALL: isEnglish ? "▼ Filter" : "▼ Filtre",
    MCA: "MCA",
    MCB: "MCB",
    PROFESSOR: "PROFESSOR"
  },
  addButton: isEnglish ? "+ Add Teacher" : "+ Ajouter Enseignant",
  noTeachers: {
    title: isEnglish ? "No teachers found" : "Aucun enseignant trouvé",
    message: isEnglish 
      ? "Try adjusting your search or filters" 
      : "Essayez d'ajuster votre recherche ou vos filtres"
  },
  modalAddTeacher: {
    title: isEnglish ? "Add New Teacher" : "Ajouter un Nouvel Enseignant",
    firstname: isEnglish ? "First Name" : "Prénom",
    familyName: isEnglish ? "Family Name" : "Nom de Famille",
    dateOfBirth: isEnglish ? "Date of Birth" : "Date de Naissance",
    photo: isEnglish ? "Photo" : "Photo",
    phoneNumber: isEnglish ? "Phone Number" : "Numéro de Téléphone",
    status: isEnglish ? "Status" : "Statut",
    email: isEnglish ? "Email" : "Email",
    extraHours: isEnglish ? "Extra Hours" : "Heures Supplémentaires",
    bio: isEnglish ? "Biography" : "Biographie",
    confirmButton: isEnglish ? "Confirm" : "Confirmer"
  },
  modalUpdateTeacher: {
    title: isEnglish ? "Update Teacher" : "Modifier l'Enseignant",
    firstname: isEnglish ? "First Name" : "Prénom",
    familyName: isEnglish ? "Family Name" : "Nom de Famille",
    dateOfBirth: isEnglish ? "Date of Birth" : "Date de Naissance",
    photo: isEnglish ? "Photo" : "Photo",
    phoneNumber: isEnglish ? "Phone Number" : "Numéro de Téléphone",
    status: isEnglish ? "Status" : "Statut",
    email: isEnglish ? "Email" : "Email",
    extraHours: isEnglish ? "Extra Hours" : "Heures Supplémentaires",
    bio: isEnglish ? "Biography" : "Biographie",
    confirmButton: isEnglish ? "Update" : "Mettre à Jour"
  },
  teacherCard:{
    view:isEnglish? "View profil" : "Voir profil ",
    handleAbsences:isEnglish?"Manage absences":"Gestion des Absences",
    handleRanks:isEnglish?"Manage ranks":"Gestion des grades",
    handleDelete:isEnglish?"Delete Teacher":"Supprimmer enseignent",
  },
  manageAbsences: {
    title: isEnglish ? "Manage Absences" : "Gérer les Absences",
    date: isEnglish ? "Date" : "Date",
    caughtUp: isEnglish ? "Caught Up" : "Rattrapé",
    reason: isEnglish ? "Reason" : "Motif",
    notes: isEnglish ? "Notes" : "Notes",
    buttonCaughtUp: isEnglish ? "Catch Up" : "Rattrapé",
    buttonDelete: isEnglish ? "Delete" : "Supprimer",
    buttonAdd: isEnglish ? "Add Absence" : "Ajouter Absence",
    titleAdd: isEnglish ? "Add New Absence" : "Ajouter une Nouvelle Absence",
    titleUpdate: isEnglish ? "Update" : "Modifier",
    buttonBack: isEnglish ? "Back" : "Retour"
  },
  manageRanks: {
    title: isEnglish ? "Manage Ranks" : "Gérer les Grades",
    date: isEnglish ? "Date" : "Date",
    rank: isEnglish ? "Rank" : "Grade",
    buttonDelete: isEnglish ? "Delete" : "Supprimer",
    buttonAdd: isEnglish ? "Add Rank" : "Ajouter Grade",
    titleAdd: isEnglish ? "Add New Rank" : "Ajouter un Nouveau Grade",
    titleUpdate: isEnglish ? "Update Rank" : "Modifier le Grade",
    buttonBack: isEnglish ? "Back" : "Retour"
  },
  deleteTeacher: {
    messageDelete: isEnglish 
      ? "Are you sure you want to delete this teacher? This action cannot be undone." 
      : "Êtes-vous sûr de vouloir supprimer cet enseignant ? Cette action est irréversible.",
    buttonDelete: isEnglish ? "Delete Teacher" : "Supprimer l'Enseignant"
  }
},
{
  page: "settings",
  
}];