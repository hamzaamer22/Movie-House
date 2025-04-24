// pages/movies/[id]/director.js
import fs from "fs/promises";
import path from "path";

export default function DirectorDetails({ director }) {
  if (!director) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{director.name}</h1>
      <p className="mb-4">{director.biography}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const movie = jsonData.movies.find((m) => m.id === context.params.id);
  const director = jsonData.directors.find((d) => d.id === movie.directorId);

  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
    },
  };
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
