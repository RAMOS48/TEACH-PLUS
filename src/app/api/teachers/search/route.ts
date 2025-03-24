import { database } from '@/lib/mysql';
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    let { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }
    keyword = keyword.replace(/[^a-zA-Z]/g, '');
    let query = `
      SELECT * FROM teachers
      WHERE firstname LIKE ? AND familyname LIKE ?
    `;
    let values = [%${keyword}%, %${keyword}%];
    let [results] = await database.execute(query, values);
    if (results.length === 0) {
      query = `
        SELECT * FROM teachers
        WHERE firstname LIKE ? OR familyname LIKE ?
      `;
      [results] = await database.execute(query, values);}
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
