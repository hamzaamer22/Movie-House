// pages/movies/[id].js
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function MovieDetails({ movie }) {
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-4">{movie.description}</p>
      <p className="mb-2">
        Director:{" "}
        <Link href={`/movies/${movie.id}/director`}>
          <div className="text-blue-500 hover:underline">{movie.directorId}</div>
        </Link>
      </p>
      <p className="mb-2">Release Year: {movie.releaseYear}</p>
      <p className="mb-2">Rating: {movie.rating}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const paths = jsonData.movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const movie = jsonData.movies.find((m) => m.id === context.params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
}
