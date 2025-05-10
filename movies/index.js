import Link from "next/link";
import path from "path";
import Layout from "@/components/Layout";
import { supabase } from "./lib/supabaseClient";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from "@mui/material";

export default function Home({ trendingMovies }) {
  const theme = useTheme();
 
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
              Trending Movies
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {trendingMovies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        Movie Poster
                      </span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                        {movie.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {movie.genres?.map((g) => g.name).join(", ") ||
                          "No genres"}
                      </p>
                    </div>
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/genres">
                <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
                  Browse Genres
                </button>
              </Link>
              <Link href="/movies">
                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300">
                  All Movies
                </button>
              </Link>
              <Link href="/director">
                <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300">
                  All Directors
                </button>
              </Link>
              <Link href="/help/123">
                <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300">
                  Help
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  );
}

export async function getStaticProps() {
  // fetch top 5 movies, ordered by rating descending
  const { data: trendingMovies, error } = await supabase
    .from("movies")
    .select("*")
    .order("rating", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching trending movies:", error);
    return {
      props: { trendingMovies: [] },
      revalidate: 10,
    };
  }

  return {
    props: { trendingMovies },
    revalidate: 10,
  };
}