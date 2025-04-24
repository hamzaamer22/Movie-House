// pages/index.js
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

export default function Home({ trendingMovies }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trending Movies</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trendingMovies.map((movie) => (
          <li key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link href={`/movies/${movie.id}`}>
              <div className="text-lg font-semibold text-black hover:underline">
                {movie.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-x-4">
        <Link href="/genres">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Browse Genres
          </button>
        </Link>
        <Link href="/movies">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            All Movies
          </button>
        </Link>
        <Link href="/director">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            All Directors
          </button>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const trendingMovies = jsonData.movies.slice(0, 5); // Assuming top 5 are trending

  return {
    props: {
      trendingMovies,
    },
    revalidate: 10,
  };
}
