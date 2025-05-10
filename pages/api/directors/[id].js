// pages/api/directors/[id].js
import { supabase } from "./lib/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;
  const { data: director, error: dirErr } = await supabase
    .from("directors")
    .select("*")
    .eq("id", id)
    .single();
  if (dirErr) return res.status(404).json({ error: "Director not found" });

  const { data: movies, error: movErr } = await supabase
    .from("movies")
    .select("*")
    .eq("directorId", id);
  if (movErr) return res.status(500).json({ error: movErr.message });

  res.status(200).json({ ...director, movies });
}