import { supabase } from "@/pages/lib/supabaseClient";
export default async function handler(req, res) {
  // 1) Get all directors
  const { data: directors, error: dirErr } = await supabase
    .from("directors")
    .select("id, name, biography");

  if (dirErr) {
    return res.status(500).json({ error: dirErr.message });
  }

  // 2) For each director, fetch their movies
  const withMovies = await Promise.all(
    directors.map(async (d) => {
      const { data: movies, error: movErr } = await supabase
        .from("movies")
        .select("id, title, releaseYear")
        .eq("directorId", d.id);

      if (movErr) {
        console.error("Error fetching movies for", d.id, movErr);
      }

      return { ...d, movies: movies ?? [] };
    })
  );

  res.status(200).json(withMovies);
}