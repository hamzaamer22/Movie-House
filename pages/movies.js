// pages/movies.js
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function MoviesPage({ movies, genres }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      {/* <select className="mb-4 p-2 border rounded-lg">
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select> */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link href={`/movies/${movie.id}`}>
              <div className="text-lg font-semibold hover:underline text-black">
                {movie.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const movies = jsonData.movies;
  const genres = jsonData.genres;

  return {
    props: {
      movies,
      genres,
    },
    revalidate: 10,
  };
}
