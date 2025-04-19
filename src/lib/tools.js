function getAcademicInfo(date) {
    const inputDate = new Date(date);
    if (isNaN(inputDate.getTime())) throw new Error("Date invalide");
    
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();
    
    let academicYear, semester;
    
    if (month >= 9) { // sept-déc
        academicYear = `${year}/${year + 1}`;
        semester = "S1";
    } else if (month >= 2 && month <= 7) { // fév-juil
        academicYear = `${year - 1}/${year}`;
        semester = "S2";
    } else if (month === 1) { // jan
        academicYear = `${year - 1}/${year}`;
        semester = "S1";
    } else { // août
        throw new Error("Mois d'août - hors période académique");
    }
    
    return { academicYear, semester };
}