import { NextResponse } from 'next/server';
import { database } from '@/lib/mysql';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let keyword = searchParams.get('keyword');

    if (!keyword) {
      return NextResponse.json({ message: 'Keyword is required' }, { status: 400 });
    }

    keyword = keyword.trim(); 

    let query = `
      SELECT * FROM Teachers
      WHERE first_name LIKE ? OR family_name LIKE ?
         OR CONCAT(first_name, ' ', family_name) LIKE ?
    `;

    let values = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`];

    let [results] = await database.execute(query, values);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
