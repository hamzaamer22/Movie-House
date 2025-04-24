// pages/genres.js
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default function GenresPage({ genres }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Genres</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {genres.map(genre => (
          <li key={genre.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link href={`/genres/${genre.id}`}>
              <div className="text-lg font-semibold hover:underline text-black">{genre.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const genres = jsonData.genres;

  return {
    props: {
      genres,
    },
  };
}
