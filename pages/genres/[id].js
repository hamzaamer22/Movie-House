// pages/genres/[id].js
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default function GenreDetails({ genre, movies }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{genre.name}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map(movie => (
          <li key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link href={`/movies/${movie.id}`}>
              <div className="text-lg font-semibold hover:underline text-black">{movie.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const genre = jsonData.genres.find(g => g.id === context.params.id);
  const movies = jsonData.movies.filter(m => m.genreId === context.params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies,
    },
  };
}
