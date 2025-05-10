import Link from "next/link";
import Layout from "@/components/Layout";
import { supabase } from "./lib/supabaseClient";


export default function MoviesPage({ movies, genres }) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
            Discover Movies
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="group"
              >
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Movie Poster</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {movie.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {movie.genres?.map((g) => genres[g]?.name).join(", ") ||
                        "No genres"}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // fetch all movies and all genres in parallel
  const [
    { data: movies, error: moviesError },
    { data: genres, error: genresError },
  ] = await Promise.all([
    supabase.from("movies").select("*"),
    supabase.from("genres").select("*"),
  ]);

  if (moviesError) {
    console.error("Error fetching movies:", moviesError);
  }
  if (genresError) {
    console.error("Error fetching genres:", genresError);
  }

  return {
    props: {
      movies: movies ?? [],
      genres: genres ?? [],
    },
    revalidate: 10, // ISR: rebuild at most every 10 seconds
  };
}